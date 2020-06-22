import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { RetrieveCartRequest, Cart } from 'src/app/model/cart.model';
import { HelperService } from 'src/app/service/pizzeria-helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  constructor(private store: Store<fromApp.AppState>, private helperService: HelperService) { }

  ngOnInit(): void {
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const cartRequest: RetrieveCartRequest = {
      userId: user.id,
      email: user.email
    }
    this.store.dispatch(
      new CartActions.RetrieveAllItemFromCartTask(cartRequest)
    );
    this.store.select('cartReducer').subscribe(response => {
      if(response.retrieveCartResponse.status.statusCd === 403) {
        console.log('403: ', response);
      } else if(response.retrieveCartResponse.status.statusCd === 400) {
        console.log('400: ', response);
      } else if(response.retrieveCartResponse.status.statusCd === 200) {
        console.log('200: ', response);
        this.cart = response.retrieveCartResponse.cart;
      }
    });
  }

  retrieveItem() {
    // this.store.dispatch(
    //   new CartActions.RetrieveAllItemFromCartTask({})
    // );
  }

}
