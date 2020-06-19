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
  wings: Wing[] = [
    {
      'id': 0, 'name': 'Tradition Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing.jpg',
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 25.89, 30.99],
      flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
      selectedFlavor: null
    },
    {
      'id': 1, 'name': 'Boneless Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing_boneless.jpg', 
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 40.99],
      flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
      selectedFlavor: null
    },
    {
      'id': 2, 'name': 'Hot Wings', 'desc': 'Hot and delicious', 'img': 'assets/wings/hotwing.jpg', 
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 40.99],
      flavors: [],
      selectedFlavor: null
    }
  ];

  qtyToPriceMap: any[] = [
    {'qty': 6, 'price': 7.59},
    {'qty': 12, 'price': 14.79},
    {'qty': 18, 'price': 20.99},
    {'qty': 24, 'price': 25.89},
    {'qty': 30, 'price': 30.99},
  ]
  isAddingItemToCart: boolean = false;
  isError: boolean = false;
  showStatus: boolean = false;
  message: string = '';
  //icon 
  faCheck = faCheck;
  faExclamation = faExclamation;

  constructor(private store: Store<fromApp.AppState>, private helperService: HelperService, private http: HttpClient) { }

  ngOnInit() {
    this.store.select('cartReducer').subscribe(response => {
      if(response.addWingToOrderResponse.status.statusCd !== 0) {
        if(response.addWingToOrderResponse.success) {
          //show checked icon
                  
          //update cart count
        } else {
          //show 'error' icon
          this.isError = true;
        }
        this.showStatus = true;
        this.isAddingItemToCart = false;
        this.message = response.addWingToOrderResponse.status.message;
      } 
      if(response.addWingToOrderResponse.status.statusCd === 403) {
        this.showStatus = true;
        this.isAddingItemToCart = false;
        this.message = response.addWingToOrderResponse.status.message;
      }
    });
  }

  addToOrder(wing: Wing) {
    this.isAddingItemToCart = true;
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const payLoad: AddWingToOrderRequest = {
      name: wing.name, 
      desc: wing.desc,
      img: wing.img,
      selectedPrice: wing.selectedPrice,
      selectedQty: +wing.selectedQty,
      selectedFlavor: wing.selectedFlavor,
      userId: user.id,
      wingId: wing.id
    }
    this.store.dispatch(
      new CartActions.AddItemToCartTask(payLoad)
    );
  }

  qtyDropdownSelect(id: number) {
    console.log('id: ' + id + ' qty: ' + this.wings[id].selectedQty);
    const qtyToPriceObjs = _.filter(this.qtyToPriceMap, ['qty', +this.wings[id].selectedQty]);
    if(qtyToPriceObjs[0] !== undefined) {
      this.wings[id].selectedPrice = qtyToPriceObjs[0].price;
    }
  }

  flavorDropdownSelect(id: number) {
    console.log('id: ' + id + ' qty: ' + this.wings[id].selectedFlavor);
  }

  test() {
    this.http.get<any>('http://localhost:8282/pizzeria/api/v1/user/topsecret').subscribe(res=>{
      console.log(res);
    });
  }
}
