import {Actions, ofType, Effect} from '@ngrx/effects';
import * as CartActions from './cart.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginStatus } from 'src/app/model/login-user-request.model';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';

// effect is nothing much but piece of code that is similar to service for making http request or localstorage
// up to you to use effect or not since it is a matter of preference if you want to stick with ngrx rather than angular
@Injectable() // because we are injection services in the constructor 
export class CartEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect() // this is for ngrx effect to pick up this effect handler
    welcomeMessage = this.actions$.pipe(
        // only trigger this effects if action is of type ADD_WELCOME_MESSAGE
        ofType(CartActions.ADD_ITEM_TO_CART), // can add multiple action here inside the ofType
        switchMap((cartData: CartActions.AddItemToCartTask) => {
            const cartPayload = cartData.payload;
            return this.http.post<any>(environment.addItemToCartUrl, cartPayload)
            .pipe(
                map((response: any) => {
                    return this.addToCartSuccess(response);
                }),
                catchError(err => {
                    return this.addToCartFailure(err);
                })
            );
        }),
    );

    addToCartSuccess(response: any) {
        if(response.success) {
            const loginSuccessStatus: LoginStatus = {
                isLoggingIn: false,
                isLoginComplete: true,
                isLoginSuccess: true
            }
            const user = {
                token: response.token.accessToken,
                id: response.id,
                nickName: response.nickName,
                email: response.email
            }
            
            return new CartActions.AddOrRemoveItemFromCartSuccess(loginSuccessStatus);
        }
        const loginFailureStatus: LoginStatus = {
            isLoggingIn: false,
            isLoginComplete: true,
            isLoginSuccess: false
        }
        return of(new CartActions.AddOrRemoveItemFromCartFailure(loginFailureStatus)); 
    }

    addToCartFailure(err: any) {
        const loginFailureStatus: LoginStatus = {
            isLoggingIn: false,
            isLoginComplete: true,
            isLoginSuccess: false
        }
        return of(new CartActions.AddOrRemoveItemFromCartFailure(loginFailureStatus)); 
    }
}