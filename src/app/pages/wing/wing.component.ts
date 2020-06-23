import { Component, OnInit } from '@angular/core';
import { Wing, AddWingToOrderRequest } from 'src/app/model/wing.model';
import _ from 'lodash';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import * as WingActions from '../wing/store/wing.action';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { HttpClient } from '@angular/common/http';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wing',
  templateUrl: './wing.component.html',
  styleUrls: ['./wing.component.css']
})
export class WingComponent implements OnInit {
  wings: Wing[] = [];
  qtyToPriceMap: any[] = [];

  isAddingItemToCart: boolean = false;
  isError: boolean = false;
  showStatus: boolean = false;
  message: string = '';
  //icon 
  faCheck = faCheck;
  faExclamation = faExclamation;

  constructor(private store: Store<fromApp.AppState>, private helperService: HelperService, private http: HttpClient) { }

  ngOnInit() {
    this.store.select('wingReducer').subscribe(response => {
      console.log(response);
      //make a deep clone of wings array
      const wingCloned = response.wings.map(wing=>{
        return {...wing};
      });
      //make a deep clone of qtyToPrice array
      const qtyToPriceMapCloned = response.qtyToPrice.map(price=>{
        return {...price};
      });
      this.wings = wingCloned;
      this.qtyToPriceMap = qtyToPriceMapCloned;
    });

    this.store.select('cartReducer').subscribe(response => {
      if(response.addWingToOrderResponse.status.statusCd === 403) {
        this.isError = true;
        this.showStatus = true;
        this.message = response.addWingToOrderResponse.status.message;
      } else if(response.addWingToOrderResponse.status.statusCd === 400) {
        this.showStatus = true;
        this.isError = true;
        this.message = response.addWingToOrderResponse.status.message;
      } else if(response.addWingToOrderResponse.status.statusCd === 200) {
        this.showStatus = true;
        this.isError = false;
        this.message = response.addWingToOrderResponse.status.message;
      }
      this.isAddingItemToCart = false;
    });
  }

  addToOrder(selectedWing: Wing) {
    this.isAddingItemToCart = true;
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const wing: AddWingToOrderRequest = {
      name: selectedWing.name, 
      desc: selectedWing.desc,
      img: selectedWing.img,
      selectedPrice: selectedWing.selectedPrice,
      selectedQty: +selectedWing.selectedQty,
      selectedFlavor: selectedWing.selectedFlavor,
      userId: user.id,
      wingId: selectedWing.id,
      hasFlavor: selectedWing.hasFlavor
    }

    this.store.dispatch(
      new CartActions.AddItemToCartTask(wing)
    );
  }

  qtyDropdownSelect(qty: number, id: number) {
    this.showStatus = false;
    const qtyToPrice = _.filter(this.qtyToPriceMap, ['qty', +qty]);//should always be one
    this.wings.map(wing=>{
      if(wing.id === id) {
        if(qtyToPrice[0] !== undefined) {
          wing.selectedPrice = qtyToPrice[0].price;
        }
      }
    });

    //let dispatch an action when update qty
    let selectedWing: Wing[] = _.filter(this.wings, ['id', id]);
    selectedWing[0].isCurrentlySelected = true;
    this.store.dispatch(
      new WingActions.QuantitySelectedAction(selectedWing[0])
    );
  }

  flavorDropdownSelect(flavor: string, id: number) {
    this.showStatus = false;
    this.wings.map(wing=>{
      if(wing.id === id) {
        wing.selectedFlavor = flavor;
      }
    });
  }
}
