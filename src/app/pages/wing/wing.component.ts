import { Component, OnInit } from '@angular/core';
import { Wing, AddWingToOrderRequest } from 'src/app/model/wing.model';
import _ from 'lodash';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
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
  

  selectedQuantity: number;


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
      const qtyToPriceMapCloned = response.qtyToPrice.map(price=>{
        return {...price};
      })
      this.wings = wingCloned;
      this.qtyToPriceMap = qtyToPriceMapCloned;





      // if(response.addWingToOrderResponse.status.statusCd !== 0) {
      //   if(response.addWingToOrderResponse.success) {
      //     //show checked icon
                  
      //     //update cart count
      //   } else {
      //     //show 'error' icon
      //     this.isError = true;
      //   }
      //   this.showStatus = true;
      //   this.isAddingItemToCart = false;
      //   this.message = response.addWingToOrderResponse.status.message;
      // } 
      // if(response.addWingToOrderResponse.status.statusCd === 403) {
      //   this.showStatus = true;
      //   this.isAddingItemToCart = false;
      //   this.message = response.addWingToOrderResponse.status.message;
      // }
    });
  }

  addToOrder(selectedWing: Wing) {
    console.log(selectedWing);

    // this.isAddingItemToCart = true;
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const wing: AddWingToOrderRequest = {
      name: selectedWing.name, 
      desc: selectedWing.desc,
      img: selectedWing.img,
      selectedPrice: selectedWing.selectedPrice,
      selectedQty: +selectedWing.selectedQty,
      selectedFlavor: selectedWing.selectedFlavor,
      userId: user.id,
      wingId: selectedWing.id
    }

    this.store.dispatch(
      new CartActions.AddItemToCartTask(wing)
    );
  }

  qtyDropdownSelect(qty: number, id: number) {
    const qtyToPrice = _.filter(this.qtyToPriceMap, ['qty', +qty]);//should always be one
    this.wings.map(wing=>{
      if(wing.id === id) {
        wing.selectedPrice = qtyToPrice[0].price;
      }
    });
  }

  flavorDropdownSelect(flavor: string, id: number) {
    console.log(flavor + ' | ' + id);
    this.wings.map(wing=>{
      if(wing.id === id) {
        wing.selectedFlavor = flavor;
      }
    });
  }

  test() {
    this.http.get<any>('http://localhost:8282/pizzeria/api/v1/user/topsecret').subscribe(res=>{
      console.log(res);
    });
  }
}
