import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { RetrieveCartRequest, Cart, CartSummary } from 'src/app/model/cart.model';
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
  cartSummary: CartSummary;
  message: string;

  selectedValue = null;
  isRemovingItemFromCart = false;

  //icons
  faTrash = faTrash;
  faPen = faPen;
  faQuestionCircle = faQuestionCircle;

  isRemoveModalVisible = false;
  isEditModalVisible = false;
  selectedWing: Wing;
  isRemoving = false;
  isUpdating = false;

  qtyToPrices = [
    {'qty': 6, 'price': 7.59},
    {'qty': 12, 'price': 14.79},
    {'qty': 18, 'price': 20.99},
    {'qty': 24, 'price': 25.89},
    {'qty': 30, 'price': 30.99},
  ];

  quanties = [6, 12, 18, 24, 30];
  flavors = ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'];
  orderQtys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  tests = ['testing', 'testing', 'testing', 'testing', 'testing','testing', 'testing', 'testing', 'testing', 'testing', 'testing'];

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
        this.cartSummary = response.retrieveCartResponse.cartSummary;
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
    this.isRemoveModalVisible = true;
    this.selectedWing = wing;

  }

  edit(wing: Wing) {
    this.isEditModalVisible = true;
    this.selectedWing = wing;
  }

  //remove item modal
  handleRemoveModalOk(): void {
    this.isRemoveModalVisible = false;
    //call /delete on cart
  }

  handleRemoveModalCancel(): void {
    this.isRemoveModalVisible = false;
  }

  //update modal
  handleEditModalCancel(): void {
    this.isEditModalVisible = false;
  }

  handleEditModalUpdate(): void {
    this.isEditModalVisible = false;
  }

  qtyDropdownSelect(qty: number) {
    console.log(qty);
  }

  checkout() {
    //go to checkout page
  }
}