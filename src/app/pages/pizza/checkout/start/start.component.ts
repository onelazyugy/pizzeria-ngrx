import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { Subscription } from 'rxjs';
import { OrderSummary } from 'src/app/model/order-summary.model';
import { PizzaSize } from 'src/app/model/pizza.model';
import _ from 'lodash';
import { Router } from '@angular/router';
import { ResetStoreTask, StoreOrderSummaryTask } from './store/start.action';

@Component({
  selector: 'app-checkout',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  //data for stepper
  showPreviousButton = false;
  showNextButton = true;
  currentStep = 0;
  shouldStepZeroHidden = false;
  shouldStepOneHidden = true;
  shouldStepTwoHidden = true;

  //forms
  personalInfoForm: FormGroup;
  deliveryInfoForm: FormGroup;
  paymentInfoForm: FormGroup;
  aptStFloorOptions: any = ['None', 'Apt', 'Suite', 'Floor'];
  //end data for stepper

  toppingSubscription: Subscription;
  startSubscription: Subscription;

  orderSummary: OrderSummary;
  totalSelectedCheeses: number;
  totalSelectedMeats: number;
  totalSelectedVeggies: number;
  
  constructor(private router: Router, private fb: FormBuilder, private store: Store<fromApp.AppState>) {}

  checkout(): void {
    for (const i in this.personalInfoForm.controls) {
      this.personalInfoForm.controls[i].markAsDirty();
      this.personalInfoForm.controls[i].updateValueAndValidity();
    }
    for (const i in this.deliveryInfoForm.controls) {
      this.deliveryInfoForm.controls[i].markAsDirty();
      this.deliveryInfoForm.controls[i].updateValueAndValidity();
    }
    for (const i in this.paymentInfoForm.controls) {
      this.paymentInfoForm.controls[i].markAsDirty();
      this.paymentInfoForm.controls[i].updateValueAndValidity();
    }
    const orderSummaryCopied: OrderSummary[] = [this.orderSummary];
    let currentSummaries: OrderSummary[] = [];
    this.startSubscription = this.store.select('startReducer').subscribe(data => {
      currentSummaries = [...data.orderSummaries, ...orderSummaryCopied];
    });
    const entireOrderSummaries = [...currentSummaries];//is because after ResetStoreTask(), currentSummaries loses the latest order summary
    //clear the store on submit payment...similar to logout
    this.store.dispatch(new ResetStoreTask());
    this.store.dispatch(new StoreOrderSummaryTask(entireOrderSummaries));
    this.router.navigate(['checkout/complete']);
  }

  ngOnInit(): void {
    this.toppingSubscription = this.store.select('toppingReducer').subscribe(toppings => {
      const totalSelectedCheeses: number = toppings.selectedCheeses.length;
      const totalSelectedMeats: number = toppings.selectedMeats.length;
      const totalSelectedVeggies: number = toppings.selectedVeggies.length;
      const totalMeatCost = totalSelectedMeats * .90;
      const totalCheeseCost = totalSelectedCheeses * .70;
      const totalVeggieCost = totalSelectedVeggies * .80;
      const subtotal = totalMeatCost + totalCheeseCost + totalVeggieCost; //not calculate pizza base price yet

      this.orderSummary = {
        orderId: (Math.floor(Math.random()*90000) + 10000),
        totalSelectedMeatTopping: totalSelectedMeats,
        totalCostForSelectedMeatTopping: totalMeatCost,
        totalSelectedVeggieTopping: totalSelectedVeggies,
        totalCostForSelectedVeggieTopping: totalVeggieCost,
        totalSelectedCheeseTopping: totalSelectedCheeses,
        totalCostForSelectedCheeseTopping: totalCheeseCost,
        pizzaBasePrice: null,
        pizzaSize: null,
        subtotal: subtotal,
        taxPercent: '7%',
        totalTax: null,
        totalDue: null,
        deliveryType: null
      }
    });

    this.toppingSubscription = this.store.select('pizzaReducer').subscribe(data => {
      //pizza size
      const pizzaSizes: PizzaSize[] = data.pizza.size;
      const finalSelectedPizzaSize: PizzaSize[] = _.filter(pizzaSizes, {isSelected: true});//guarantee to be 1 at all time
      const finalPizzaSize = finalSelectedPizzaSize[0].label;
      this.orderSummary.pizzaSize = finalPizzaSize;
      this.orderSummary.pizzaBasePrice = data.pizza.price;
      const newSubTotal = this.orderSummary.subtotal + data.pizza.price;
      this.orderSummary.subtotal = newSubTotal;
      const newTotalTax = newSubTotal * .07;
      this.orderSummary.totalTax = newTotalTax;
      this.orderSummary.totalDue = newTotalTax + newSubTotal;

      const currentSelectedDeliveryType = _.filter(data.pizza.deliveryType, {'isSelected': true});
      this.orderSummary.deliveryType = currentSelectedDeliveryType[0].value;
    });
    const validateAddress = this.orderSummary.deliveryType === 'delivery'? true: false;
    
    //personal form
    this.personalInfoForm = this.fb.group({
      userName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });

    //payment form
    this.paymentInfoForm = this.fb.group({
      cardNumber: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
      cvv: [null, [Validators.required]],
      zipCodeForPayment: [null, [Validators.required]],
    });
    
    //delivery form
    this.deliveryInfoForm = this.fb.group({
      comment: [null],
      // address: [null, [Validators.required]],
      address: [null],
      aptStFloor: [null],
      aptStFloorSelect: [null],
      zipCodeForDeliveryAddress: [null]
    });
    //set select default
    this.deliveryInfoForm.controls['aptStFloorSelect'].setValue('None', {onlySelf: true});
    //delivery, we need to validate
    if(validateAddress) {
      this.deliveryInfoForm.controls["address"].setValidators(Validators.required);
      this.deliveryInfoForm.controls["address"].updateValueAndValidity();

      this.deliveryInfoForm.controls["zipCodeForDeliveryAddress"].setValidators(Validators.required);
      this.deliveryInfoForm.controls["zipCodeForDeliveryAddress"].updateValueAndValidity();
    }
  }

  next() {
    this.currentStep += 1;
    if(this.currentStep === 2) {
      this.showNextButton = false;
    }
    if(this.currentStep > 0) {
      this.showPreviousButton = true;
    }
    switch(this.currentStep) {
      case 0: 
        return null;
      case 1:
        this.shouldStepZeroHidden = true;
        this.shouldStepOneHidden = false;
        return null;
      case 2: 
        this.shouldStepOneHidden = true;
        this.shouldStepTwoHidden = false;
        return null;
      default:
        return null;
    }
  }

  pre() {
    this.currentStep -= 1;
    if(this.currentStep === 0) {
      this.showPreviousButton = false;
    }
    if(this.currentStep < 2) {
      this.showNextButton = true;
    }
    switch(this.currentStep) {
      case 0: 
        this.shouldStepZeroHidden = false;
        this.shouldStepOneHidden = true;
        return null;
      case 1:
        this.shouldStepOneHidden = false;
        this.shouldStepTwoHidden = true;
        return null;
      case 2: 
        this.shouldStepZeroHidden = true;
        this.shouldStepOneHidden = true;
        this.shouldStepTwoHidden = false;
        return null;
      default:
        return null;
    }
  }

  ngOnDestroy(): void {
    if(this.toppingSubscription !== undefined) {
      this.toppingSubscription.unsubscribe();
    }
    if(this.startSubscription !== undefined) {
      this.startSubscription.unsubscribe();
    }
  }
}
