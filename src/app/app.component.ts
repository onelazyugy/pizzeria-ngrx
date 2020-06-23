import { Component, OnInit } from '@angular/core';
import { HelperService } from './service/pizzeria-helper.service';
import { Router } from '@angular/router';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from './pages/login/store/login.action';
import * as CartActions from './pages/cart/store/cart.action';
import { LoginStatus } from './model/login-user-request.model';
import { Location } from "@angular/common";
import { ResetStoreTask } from '../app/pages/pizza/checkout/start/store/start.action';
import { faSignOutAlt, faSignInAlt, faPizzaSlice, faDrumstickBite, faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { RetrieveCartRequest } from './model/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  currentSelectedRoute = '';
  isSelected = false;
  isShowUserInfo = false;
  nickName = '';

  //cart count
  totalItemInCart = 0;

  //icons
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faPizzaSlice = faPizzaSlice;
  faDrumstickBite = faDrumstickBite;
  faList = faList;
  faShoppingCart = faShoppingCart;
  
  routes: any[] = [
    {label: 'Pizza', route: '', isSelected: false, showRoute: true, icon: faPizzaSlice},
    {label: 'Wings', route: '/wings', isSelected: false, showRoute: true, icon: faDrumstickBite},
    {label: 'Summary', route: '/summary', isSelected: false, showRoute: true, icon: faList},
    {label: 'Cart', route: '/cart', isSelected: false, showRoute: true, icon: faShoppingCart},
  ]

  constructor(private helperService: HelperService, private route: Router, 
    private location: Location, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('loginReducer').subscribe(response => {
      if(this.helperService.getObjectFromLocalStorage() === undefined) {
        this.isShowUserInfo = false;
      } else {
        const userLoggedInInfo = JSON.parse(this.helperService.getObjectFromLocalStorage());
        this.nickName = userLoggedInInfo.nickName;
        this.isShowUserInfo = true;
      }
      const currentPath = this.location.path();
      if(currentPath === '') {
        this.routes[0].isSelected = true;
      } else if(currentPath === '/wings') {
        this.routes[1].isSelected = true;
      } else if(currentPath === '/summary') {
        this.routes[2].isSelected = true;
      } else if(currentPath === '/cart') {
        this.routes[3].isSelected = true;
      }
      //TODO: need to handle nzSelected when programmatically routed
    });
    //when refresh, query total item in cart and display it
    this.retrieveTotalItemInCartCount();
    //below is a listener when there is an item get added to cart only but not when page refresh
    this.store.select('cartReducer').subscribe(response=>{
      this.totalItemInCart = response.totalItemInCart;
    });
  }

  retrieveTotalItemInCartCount() {
    if(this.helperService.getObjectFromLocalStorage() !== undefined) {
      const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
      const cartItemCountRequest: RetrieveCartRequest = {
        userId: user.id,
        email: user.email
      }
      this.store.dispatch(
        new CartActions.RetrieveTotalItemCountInCartTask(cartItemCountRequest)
      );
    }
  }

  logout() {
    this.helperService.removeFromLocalStorage();
    // call the store and remove login data set loginStartStatus to false
    // make all false to indicate that user is logging out
    const logoutUserStatus: LoginStatus = {
      isLoggingIn: false,
      isLoginComplete: false,
      isLoginSuccess: false
  }
    this.store.dispatch(
      new LoginActions.LogoutUserTask(logoutUserStatus)
    );
    //clear all store
    this.store.dispatch(new ResetStoreTask());
    this.route.navigate(['/login']);
  }
}