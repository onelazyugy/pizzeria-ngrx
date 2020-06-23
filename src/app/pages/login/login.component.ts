import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.action';
import * as CartActions from '../cart/store/cart.action';
import { LoginUserRequest } from 'src/app/model/login-user-request.model';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { RetrieveCartRequest } from 'src/app/model/cart.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  userLoginForm: FormGroup;
  loginSubscription: Subscription;
  isLoggingIn: boolean = false;
  status: string = '';

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder, private route: Router, private helperService: HelperService) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.loginSubscription = this.store.select('loginReducer').subscribe(response => {  
      if(response.loginStatus.isLoginComplete) {
        this.isLoggingIn = false;
        if(response.loginStatus.isLoginSuccess) {
          this.status = 'login success! redirecing...';
          setTimeout(() => {
            //redirect to login page after 1 second to indicate register success
            this.route.navigate(['/']);
            //let fetch the cart item count
            this.retrieveTotalItemInCartCount();
          }, 500);
        } else if(!response.loginStatus.isLoginSuccess) {
          this.status = 'login fail';
        }
      }
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

  submitForm(): void {
    for (const i in this.userLoginForm.controls) {
      this.userLoginForm.controls[i].markAsDirty();
      this.userLoginForm.controls[i].updateValueAndValidity();
    }
    const loginUserRequest: LoginUserRequest = {
      email: this.userLoginForm.value.email,
      password: this.userLoginForm.value.password
    };
    this.isLoggingIn = true;
    this.status = '';
    this.store.dispatch(
      new LoginActions.StartLoginUserTask(loginUserRequest)
    );
  }

  redirectToRegister(): void {
    this.route.navigate(['/register']);
  }

  ngOnDestroy(): void {
    if(this.loginSubscription !== undefined) {
      this.loginSubscription.unsubscribe();
    }
  }
}
