import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import _ from 'lodash';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { RetrieveCartRequest, Cart, CartSummary, RemoveItemFromCartRequest, RetrieveCartResponse, UpdateItemFromCartRequest } from 'src/app/model/cart.model';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { faTrash, faPen, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Wing } from 'src/app/model/wing.model';
import { Pizza } from 'src/app/model/pizza.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  updateItemInCartForm: FormGroup;

  cart: Cart;
  cartSummary: CartSummary;
  selectedWing: Wing;

  selectedQty: any;//should be number but select ui is expecting string
  selectedFlavor: string;
  numberOfOrder: any;

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
  isUpdateBtnDisabled = false;
  isShowMessageIndicator = false;
  messageIndicator = {
      type: '',
      message: ''
  };

  //mesages and status
  statusMessageOnModal: string;
  statusMessageOnNonModal: string;
  isShowSuccessStatusMessageOnModal = false;
  isShowFailureStatusMessageOnModal = false;
  isShowStatusMessageOnNonModal = false;

  qtyToPriceMap: any[] = [];

  quanties = [6, 12, 18, 24, 30];
  flavors = ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'];
  orderQtys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder, private helperService: HelperService) { }

  ngOnInit(): void {
    this.store.select('wingReducer').subscribe(response => {
      //make a deep clone of qtyToPrice array
      const qtyToPriceMapCloned = response.qtyToPrice.map(price=>{
        return {...price};
      });
      this.qtyToPriceMap = qtyToPriceMapCloned;
    });

    this.updateItemInCartForm = this.fb.group({
      qty: [null],
      flavor: [null],
      nbrOfOrder: [null]
    });

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
                this.isShowStatusMessageOnNonModal = true;
                this.statusMessageOnNonModal = 'your cart is empty';//response.retrieveCartResponse.status.message;
                this.cart = response.retrieveCartResponse.cart;
                this.cartSummary = response.retrieveCartResponse.cartSummary;
              } else {
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
          case 'UPDATE':
            this.isShowMessageIndicator = true;
            if(statusCd === 403 || statusCd === 400 || statusCd === 500) {
              this.messageIndicator = {
                type: 'error',
                message: response.retrieveCartResponse.status.message
              }
            } else if(statusCd === 200) { 
              this.messageIndicator = {
                type: 'success',
                message: response.retrieveCartResponse.status.message
              }
              this.cart = response.retrieveCartResponse.cart;
              this.cartSummary = response.retrieveCartResponse.cartSummary;
            } else {
              this.messageIndicator = {
                type: 'success',
                message: 'unknow error, contact support'
              }
            }
            this.isUpdating = false;
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
    
    this.selectedQty = wing.selectedQty.toString();
    this.selectedFlavor = wing.selectedFlavor;
    this.numberOfOrder = wing.numberOfOrder.toString();
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
    //reset back to original 
    this.selectedFlavor = this.selectedFlavor;
    this.selectedQty = this.selectedQty;
    this.numberOfOrder = this.numberOfOrder;
    this.isShowMessageIndicator = false;

    this.isUpdateBtnDisabled = false;
    this.isUpdating = false;
  }

  handleEditModalUpdate(): void {
    this.isUpdating = true;
    this.isUpdateBtnDisabled = true;
    const qty = this.updateItemInCartForm.value.qty.toString();
    let flavor;
    if(!this.selectedWing.hasFlavor) {
      flavor = null;
    } else {
      flavor = this.updateItemInCartForm.value.flavor.toString();
    }
    const nbrOfOrder = this.updateItemInCartForm.value.nbrOfOrder.toString();
    
    //wing w/out flavor
    if(!this.selectedWing.hasFlavor) {
      if(qty === this.selectedWing.selectedQty.toString() && nbrOfOrder === this.selectedWing.numberOfOrder.toString()) {
        this.isShowMessageIndicator = true;
        this.messageIndicator = {
          type: 'warning',
          message: 'Please change your selection to something different!'
        }
        this.isUpdating = false;
        this.isUpdateBtnDisabled = false;
      } else {
        //make update request
        this.updateItem(flavor, nbrOfOrder, qty);
      }
    } else {
      if(qty === this.selectedWing.selectedQty.toString() && flavor === this.selectedWing.selectedFlavor.toString() && nbrOfOrder === this.selectedWing.numberOfOrder.toString()) {
        this.isShowMessageIndicator = true;
        this.messageIndicator = {
          type: 'warning',
          message: 'Please change your selection to something different!'
        }
        this.isUpdating = false;
        this.isUpdateBtnDisabled = false;
      } else {
        //make update request
        this.updateItem(flavor, nbrOfOrder, qty);
      }
    }
  }

  updateItem(flavor: string, nbrOfOrder: string, qty: string) {
    //make update request
    let wingToUpdate: Wing = {...this.selectedWing};
    wingToUpdate.selectedFlavor = flavor;
    wingToUpdate.numberOfOrder = +nbrOfOrder;
    wingToUpdate.selectedQty = +qty;
    //make qty to price
    const qtyToPrice = _.filter(this.qtyToPriceMap, ['qty', +qty]);//should always be one
    wingToUpdate.selectedPrice = qtyToPrice[0].price;;

    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const request: UpdateItemFromCartRequest = {
      enc: user.enc,
      type: 'wing',
      originalSelectedQty: this.selectedWing.selectedQty,
      originalSelectedFlavor: this.selectedWing.selectedFlavor,
      originalNumberOfOrder: this.selectedWing.numberOfOrder,
      wing: wingToUpdate
    }
    this.store.dispatch(
      new CartActions.UpdateItemFromCartTask(request)
    );
  }

  editPizza(pizza: Pizza) {
    
  }

  removePizza(pizza: Pizza) {
    
  }

  qtyDropdownSelect(qty: string) {
    // console.log(qty);
  }

  flavorDropdownSelect(flavor: string) {
    // console.log(flavor);
  }

  numberOfOrderDropdownSelect(numberOfOrder: number) {
    // console.log(numberOfOrder);
  }

  checkout() {
    //go to checkout page
  }
}