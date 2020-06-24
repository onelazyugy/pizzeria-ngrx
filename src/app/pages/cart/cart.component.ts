import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { RetrieveCartRequest, Cart } from 'src/app/model/cart.model';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { faTrash, faPen, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Wing } from 'src/app/model/wing.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  message: string;

  //icons
  faTrash = faTrash;
  faPen = faPen;
  faQuestionCircle = faQuestionCircle;

  isVisible = false;
  selectedWing: Wing;

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
        this.message = response.retrieveCartResponse.status.message;
      } else if(response.retrieveCartResponse.status.statusCd === 400) {
        this.message = response.retrieveCartResponse.status.message;
      } else if(response.retrieveCartResponse.status.statusCd === 200) {
        this.cart = response.retrieveCartResponse.cart;
        this.message = '';
        if(response.retrieveCartResponse.totalItemInCart === 0) {
          this.message = response.retrieveCartResponse.status.message;
        }
      } else {
        this.message = response.retrieveCartResponse.status.message;
      }
    });
  }

  remove(wing: Wing) {
    this.isVisible = true;
    this.selectedWing = wing;

  }

  handleOk(): void {
    this.isVisible = false;
    //call /delete on cart
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}