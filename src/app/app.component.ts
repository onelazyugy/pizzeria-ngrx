import { Component, OnInit } from '@angular/core';
import { HelperService } from './service/pizzeria-helper.service';
import { Router } from '@angular/router';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from './pages/login/store/login.action';
import { LoginStatus } from './model/login-user-request.model';
import { Location } from "@angular/common";
import { ResetStoreTask } from '../app/pages/pizza/checkout/start/store/start.action';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  
  routes: any[] = [
    {label: 'Pizza', route: '', isSelected: false, showRoute: true},
    {label: 'Wings', route: '/wings', isSelected: false, showRoute: true},
    {label: 'Summary', route: '/summary', isSelected: false, showRoute: true},
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
        console.log('path: ', currentPath);
        this.routes[0].isSelected = true;
      } else if(currentPath === '/wings') {
        console.log('path: ', currentPath);
        this.routes[1].isSelected = true;
      } else if(currentPath === '/summary') {
        console.log('path: ', currentPath);
        this.routes[2].isSelected = true;
      }
      //TODO: need to handle nzSelected when programmatically routed
    });
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
