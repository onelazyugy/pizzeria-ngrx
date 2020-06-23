import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Subscription } from 'rxjs';
import { Pizza, PizzaSize, DeliveryType } from 'src/app/model/pizza.model';
import * as PizzaAction from './store/pizza.action';
import _ from 'lodash';
import { Router } from '@angular/router';
import { faCar, faPizzaSlice, faCubes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  current = 0;
  //data for pizza component
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

  //icons
  faCar = faCar;
  faPizzaSlice = faPizzaSlice;
  faCubes = faCubes;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    //load data for Topping compnent
    this.toppingSubscription = this.store.select('toppingReducer').subscribe(toppings => {
      this.cheeses = toppings.cheeses;
      this.meats = toppings.meats;
      this.veggies = toppings.veggies;
    });
    //load data for this pizza component
    this.pizzaSubscription = this.store.select('pizzaReducer').subscribe(data => {
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

  checkout(): void {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(): void {
    if(this.toppingSubscription !== undefined) {
      this.toppingSubscription.unsubscribe();
    }
    if(this.pizzaSubscription !== undefined) {
      this.pizzaSubscription.unsubscribe();
    }
  }
}
