import { Component } from '@angular/core';
import { HelperService } from './service/pizzeria-helper.service';
import { Router } from '@angular/router';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from './pages/login/store/login.action';
import { LoginStatus } from './model/login-user-request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private helperService: HelperService, private route: Router, private store: Store<fromApp.AppState>) {}

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
    this.route.navigate(['/login']);
  }
}
