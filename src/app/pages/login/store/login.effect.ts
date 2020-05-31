import {Actions, ofType, Effect} from '@ngrx/effects';
import * as LoginActions from './login.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginStatus } from 'src/app/model/login-user-request.model';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';

// effect is nothing much but piece of code that is similar to service for making http request or localstorage
// up to you to use effect or not since it is a matter of preference if you want to stick with ngrx rather than angular
@Injectable() // because we are injection services in the constructor 
export class LoginEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect() // this is for ngrx effect to pick up this effect handler
    welcomeMessage = this.actions$.pipe(
        // only trigger this effects if action is of type ADD_WELCOME_MESSAGE
        ofType(LoginActions.START_LOGIN_USER), // can add multiple action here inside the ofType
        switchMap((loginUserData: LoginActions.StartLoginUserTask) => {
            const loginPayload = loginUserData.payload;
            return this.http.post<any>(environment.loginUrl, loginPayload)
            .pipe(
                map((response: any) => {
                    const loginSuccessStatus: LoginStatus = {
                        isLoggingIn: false,
                        isLoginComplete: true,
                        isLoginSuccess: true
                    }
                    return new LoginActions.LoginUserTaskSuccess(loginSuccessStatus);
                }),
                catchError(err => {
                    //status code >= 300
                    const loginFailureStatus: LoginStatus = {
                        isLoggingIn: false,
                        isLoginComplete: true,
                        isLoginSuccess: false
                    }
                    return of(new LoginActions.LoginUserTaskFailure(loginFailureStatus)); 
                })
            );
        }),
    );
}