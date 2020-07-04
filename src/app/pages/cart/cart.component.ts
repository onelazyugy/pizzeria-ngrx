import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { RetrieveCartRequest, Cart, CartSummary, RemoveItemFromCartRequest, RetrieveCartResponse } from 'src/app/model/cart.model';
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
  selectedWing: Wing;
  
  selectedValue = null;

  //icons
  faTrash = faTrash;
  faPen = faPen;
  faQuestionCircle = faQuestionCircle;

  //remove item
  isRemoveModalVisible = false;
  isRemoving = false;
  isRemovedBtnDisabled = false;
  
  //update item
  isEditModalVisible = false;
  isUpdating = false;

  //mesages and status
  statusMessageOnModal: string;
  statusMessageOnNonModal: string;
  isShowSuccessStatusMessageOnModal = false;
  isShowFailureStatusMessageOnModal = false;
  isShowStatusMessageOnNonModal = false;

  // isSuccess = false;

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
    this.isShowSuccessStatusMessageOnModal = false;
    this.isShowFailureStatusMessageOnModal = false;
    this.isShowStatusMessageOnNonModal = false;
    if(this.helperService.getObjectFromLocalStorage() === undefined) {
      this.isShowStatusMessageOnNonModal = true;
      this.statusMessageOnNonModal = 'session expired, please log back in';
    } else {
      const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
      const cartRequest: RetrieveCartRequest = {
        userId: user.id,
        email: user.email
      }
      this.store.dispatch(
        new CartActions.RetrieveAllItemFromCartTask(cartRequest)
      );
      this.store.select('cartReducer').subscribe(response => {
        const retrieveCartResponse: RetrieveCartResponse = response.retrieveCartResponse;
        // console.log('retrieveCartResponse: ', response.retrieveCartResponse);
        console.log('action: ', response.retrieveCartResponse.action);
        const action = response.retrieveCartResponse.action;
        const statusCd = response.retrieveCartResponse.status.statusCd;
        switch(action) {
          case 'RETRIEVE_ALL':
            if(statusCd === 403 || statusCd === 400 || statusCd === 500) {
              this.isShowStatusMessageOnNonModal = true;
              this.statusMessageOnNonModal = response.retrieveCartResponse.status.message;
            } else if(statusCd === 200) {
              const totalItemInCart = response.retrieveCartResponse.totalItemInCart
              if(totalItemInCart === 0) {
                this.isShowStatusMessageOnNonModal = true;
                this.statusMessageOnNonModal = response.retrieveCartResponse.status.message;
              } else {
                this.cart = response.retrieveCartResponse.cart;
                this.cartSummary = response.retrieveCartResponse.cartSummary;
                this.isShowStatusMessageOnNonModal = false;
              }
            } else {
              this.isShowStatusMessageOnNonModal = true;
              this.statusMessageOnNonModal = 'unknow error, contact support';
            }
            break;
          case 'REMOVE':
            if(statusCd === 403 || statusCd === 400 || statusCd === 500) {
              this.isShowStatusMessageOnNonModal = false;
              this.isShowSuccessStatusMessageOnModal = false;
              this.isShowFailureStatusMessageOnModal = true;
              this.statusMessageOnModal = response.retrieveCartResponse.status.message;
              this.isRemoving = false;
              this.isRemovedBtnDisabled = true;
            } else if(statusCd === 200) {
              this.isShowSuccessStatusMessageOnModal = true;
              this.isShowFailureStatusMessageOnModal = false;
              this.statusMessageOnModal = response.retrieveCartResponse.status.message;
              const totalItemInCart = response.retrieveCartResponse.totalItemInCart
              if(totalItemInCart === 0) {
                console.log('CART IS EMPTY');
                this.isShowStatusMessageOnNonModal = true;
                this.statusMessageOnNonModal = 'your cart is empty';//response.retrieveCartResponse.status.message;
                this.cart = response.retrieveCartResponse.cart;
                this.cartSummary = response.retrieveCartResponse.cartSummary;
              } else {
                console.log('CART IS NOT EMPTY');
                this.isShowStatusMessageOnNonModal = false;
                this.isShowSuccessStatusMessageOnModal = true;
                this.statusMessageOnModal = response.retrieveCartResponse.status.message;
                this.cart = response.retrieveCartResponse.cart;
                this.cartSummary = response.retrieveCartResponse.cartSummary;
              }
              this.isRemoving = false;
              this.isRemovedBtnDisabled = true;
            } else {
              this.isShowStatusMessageOnNonModal = false;
              this.isShowSuccessStatusMessageOnModal = true;
              this.statusMessageOnModal = 'unknow error, contact support';
              this.isRemoving = false;
              this.isRemovedBtnDisabled = true;
            }
            break;
          default:
            break;
        }
      });
    }
  }

  removeWing(wing: Wing) {
    this.isRemoveModalVisible = true;
    this.selectedWing = wing;
    this.isShowStatusMessageOnNonModal = false;
    this.isShowSuccessStatusMessageOnModal = false;
    this.isShowFailureStatusMessageOnModal = false;
    this.isRemovedBtnDisabled = false;
  }

  editWing(wing: Wing) {
    this.isEditModalVisible = true;
    this.selectedWing = wing;
  }

  //remove item modal
  handleRemoveModalOk(): void {
    this.isShowStatusMessageOnNonModal = true;
    this.isShowFailureStatusMessageOnModal = true;
    this.isRemoving = true;
    this.isRemovedBtnDisabled = true;
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const request: RemoveItemFromCartRequest = {
      enc: user.enc,
      type: 'wing',
      itemId: this.selectedWing.wingId,
      numberOfOrder: this.selectedWing.numberOfOrder
    }
    this.store.dispatch(
      new CartActions.RemoveItemFromCartTask(request)
    );
  }

  handleRemoveModalCancel(): void {
    this.isRemoveModalVisible = false;
    this.isShowSuccessStatusMessageOnModal = false;
    this.isShowFailureStatusMessageOnModal = false;
    this.isRemoving = false;
    this.isRemovedBtnDisabled = false;
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