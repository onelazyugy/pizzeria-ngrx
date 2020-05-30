import {Actions, ofType, Effect} from '@ngrx/effects';
import * as RegisterActions from './register.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegisterStatus } from 'src/app/model/register-user-request.model';

// effect is nothing much but piece of code that is similar to service for making http request or localstorage
// up to you to use effect or not since it is a matter of preference if you want to stick with ngrx rather than angular
@Injectable() // because we are injection services in the constructor 
export class RegisterEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect() // this is for ngrx effect to pick up this effect handler
    welcomeMessage = this.actions$.pipe(
        // only trigger this effects if action is of type ADD_WELCOME_MESSAGE
        ofType(RegisterActions.START_REGISTER_USER), // can add multiple action here inside the ofType
        switchMap((registerUserData: RegisterActions.StartRegisterUserTask) => {
            const registrationPayload = registerUserData.payload;
            return this.http.post<any>('http://localhost:8282/pizzeria/api/v1/user/register', registrationPayload)
            .pipe(
                map((response: any) => {
                    const registerSuccessStatus: RegisterStatus = {
                        isRegistering: false,
                        isRegisteringComplete: true,
                        isRegisterSuccess: true
                    }
                    return new RegisterActions.RegisterUserTaskSuccess(registerSuccessStatus);
                }),
                catchError(err => {
                    //status code >= 300
                    const registerFailureStatus: RegisterStatus = {
                        isRegistering: false,
                        isRegisteringComplete: true,
                        isRegisterSuccess: false
                    }
                    return of(new RegisterActions.RegisterUserTaskFailure(registerFailureStatus)); 
                })
            );
        }),
    );
}