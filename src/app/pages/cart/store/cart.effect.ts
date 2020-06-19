import {Actions, ofType, Effect} from '@ngrx/effects';
import * as CartActions from './cart.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { AddWingToOrderResponse, Status } from 'src/app/model/wing.model';

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
            return this.http.post<any>(environment.addWingToCartUrl, cartPayload)
            .pipe(
                map((response: AddWingToOrderResponse) => {
                    return this.addToCartSuccess(response);
                }),
                catchError(err => {
                    if(err.status === 403) {
                        //TODO: need to redirect to login or logic to refresh token
                        const status: Status = {
                            message: 'session expired please log back in',
                            timestamp: '',
                            transactionId: '',
                            statusCd: 403
                        }
                        return this.addToCartFailure(status);
                    }
                    const status: Status = err.error.status;
                    return this.addToCartFailure(status);
                })
            );
        }),
    );

    addToCartSuccess(response: AddWingToOrderResponse) {
        if(response.success) {           
            return new CartActions.CartActionSuccess(response);
        } else {
            console.error(response.status.message);
            const status: Status = {
                message: response.status.message,
                statusCd: response.status.statusCd,
                transactionId: response.status.transactionId,
                timestamp: response.status.timestamp
            }
            return of(new CartActions.CartActionFailure(status));
        }
    }

    addToCartFailure(status: Status) {
        console.error(status.message);
        return of(new CartActions.CartActionFailure(status)); 
    }
}