import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Subscription } from 'rxjs';
import { Pizza, PizzaSize, DeliveryType, AddPizzaToOrderRequest, AddPizzaToOrderResponse } from 'src/app/model/pizza.model';
import * as PizzaAction from './store/pizza.action';
import _ from 'lodash';
import { Router } from '@angular/router';
import { faCar, faPizzaSlice, faCubes } from '@fortawesome/free-solid-svg-icons';
import * as CartActions from '../../cart/store/cart.action';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { ResetStoreTask } from '../checkout/start/store/start.action';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  current = 0;
  //data for pizza component
  pizza: Pizza;
  pizzaSizeArray: PizzaSize[] = [];
  selectedPizzaSize = '';
  finalSelectedPizzaSize = '';

  initialPizzaImage = '';

  deliveryTypeArray: DeliveryType[] = [];
  selectedDeliveryType = '';
  finalSelectedDeliveryType = '';

  //data for Topping component
  cheeses: Ingredient[];
  meats: Ingredient[];
  veggies: Ingredient[];

  selectedCheeeses: Ingredient[];
  selectedMeats: Ingredient[];
  selectedVeggies: Ingredient[];

  toppingSubscription: Subscription;
  pizzaSubscription: Subscription;
  cartSubscription: Subscription;

  //icons
  faCar = faCar;
  faPizzaSlice = faPizzaSlice;
  faCubes = faCubes;

  //cart
  isShowMessageIndicator = false;
  isAddingPizzaToCart = false;
  isAddToOrderBtnDisabled = false;
  isPreviousBtnDisabled = false;
  messageIndicator = {
    type: '',
    message: ''
};

  constructor(private store: Store<fromApp.AppState>, private router: Router, private helperService: HelperService) { }

  ngOnInit() {
    //load data for Topping compnent
    this.toppingSubscription = this.store.select('toppingReducer').subscribe(toppings => {
      this.cheeses = toppings.cheeses;
      this.meats = toppings.meats;
      this.veggies = toppings.veggies;
    });
    //load data for this pizza component
    this.pizzaSubscription = this.store.select('pizzaReducer').subscribe(data => {
      this.pizza = data.pizza;//use this throughout
      const pizza: Pizza = data.pizza;
      this.pizzaSizeArray = pizza.size;
      this.deliveryTypeArray = pizza.deliveryType;

      //pizza size
      const currentSelectedSize = _.filter(this.pizzaSizeArray, {'isSelected': true});
      this.selectedPizzaSize = currentSelectedSize[0].value;//should always be one in the array
      this.initialPizzaImage = pizza.typeOfImage.initialPizzaImage;

      //delivery type
      const currentSelectedDeliveryType = _.filter(this.deliveryTypeArray, {'isSelected': true});
      this.selectedDeliveryType = currentSelectedDeliveryType[0].value;
    });

    //load data from cart
    this.cartSubscription = this.store.select('cartReducer').subscribe(data => {
      this.isShowMessageIndicator = true;
      const addPizzaToCartResponse = data.addPizzaToOrderResponse;
      if(addPizzaToCartResponse.status.statusCd === 200) {
        this.messageIndicator = {
          type: 'success',
          message: addPizzaToCartResponse.status.message
        }
      } else {
        this.messageIndicator = {
          type: 'error',
          message: addPizzaToCartResponse.status.message
        }
      }
      this.isAddingPizzaToCart = false;
    });
    
  }

  onSelectSize(size: string) {
    let selectedSize: PizzaSize[] = _.filter(this.pizzaSizeArray, {'value': size});
    let selectedSizeUpdated = {...selectedSize[0], isSelected: true}
    this.store.dispatch(new PizzaAction.SelectAPizzaSize(selectedSizeUpdated));
  }

  onSelectDeliveryType(deliveryType: string) {
    console.log(deliveryType);
    let selectedDeliveryType: DeliveryType[] = _.filter(this.deliveryTypeArray, {'value': deliveryType});
    let selectedDeliveryTypeUpdated = {...selectedDeliveryType[0], isSelected: true}
    this.store.dispatch(new PizzaAction.SelectADeliveryType(selectedDeliveryTypeUpdated));
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
    if(this.current === 4){
      this.isShowMessageIndicator = false;
      this.toppingSubscription = this.store.select('toppingReducer').subscribe(toppings => {
        this.selectedCheeeses = toppings.selectedCheeses;
        this.selectedMeats = toppings.selectedMeats;
        this.selectedVeggies = toppings.selectedVeggies;
      });

      this.pizzaSubscription = this.store.select('pizzaReducer').subscribe(data => {
        //pizza size
        const pizzaSizes: PizzaSize[] = data.pizza.size;
        const finalSelectedPizzaSize: PizzaSize[] = _.filter(pizzaSizes, {isSelected: true});//guarantee to be 1 at all time
        this.finalSelectedPizzaSize = finalSelectedPizzaSize[0].label;

        //delivery type
        const deliveryTypes: DeliveryType[] = data.pizza.deliveryType;
        const finalSelectedDeliveryType: DeliveryType[] = _.filter(deliveryTypes, {isSelected: true});//guarantee to be 1 at all time
        this.finalSelectedDeliveryType = finalSelectedDeliveryType[0].label;
      });
    }
  }

  addToOrder(): void {
    this.isAddingPizzaToCart = true;
    this. isAddToOrderBtnDisabled = true;
    this.isPreviousBtnDisabled = true;

    this.selectedCheeeses;
    this.selectedMeats;
    this.selectedVeggies;
    this.selectedPizzaSize;
    this.pizza;
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());

    const request: AddPizzaToOrderRequest = {
      selectedPizzaSize: this.finalSelectedPizzaSize,
      orderType: this.selectedDeliveryType,
      img: this.pizza.typeOfImage.endPizzaImage,
      selectedCheese: this.selectedCheeeses,
      selectedMeat: this.selectedMeats,
      selectedVeggie: this.selectedVeggies,
      userId: user.id
    }
    this.store.dispatch(
      new CartActions.AddPizzaToCartTask(request)
    );
    //clear the store 
    this.store.dispatch(new ResetStoreTask());
  }

  ngOnDestroy(): void {
    if(this.toppingSubscription !== undefined) {
      this.toppingSubscription.unsubscribe();
    }
    if(this.pizzaSubscription !== undefined) {
      this.pizzaSubscription.unsubscribe();
    }
    if(this.cartSubscription !== undefined) {
      this.cartSubscription.unsubscribe();
    }
  }
}