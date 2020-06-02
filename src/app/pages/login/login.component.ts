import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.action';
import { LoginUserRequest } from 'src/app/model/login-user-request.model';
import { Subscription } from 'rxjs';

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

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder, private route: Router) {}

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
            //redirect to login page after 2 second to indicate register success
            this.route.navigate(['/']);
          }, 2000);
        } else if(!response.loginStatus.isLoginSuccess) {
          // isLoggingIn: false,
          // isLoginComplete: true,
          // isLoginSuccess: false
          this.status = 'login fail';
        }
      }
    });
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
