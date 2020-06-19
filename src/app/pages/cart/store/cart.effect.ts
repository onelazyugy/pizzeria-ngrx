import {Actions, ofType, Effect} from '@ngrx/effects';
import * as CartActions from './cart.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { AddWingToOrderResponse } from 'src/app/model/wing.model';

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
            // return this.http.post<any>(environment.addWingToCartUrl, cartPayload, options)
            return this.http.post<any>('http://localhost:8282/pizzeria/api/v1/cart/add/wing', cartPayload)
            //http://localhost:8282/pizzeria/api/v1/cart/add/wing
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

    addToCartSuccess(response: AddWingToOrderResponse) {
        if(response.success) {           
            return new CartActions.AddOrRemoveItemFromCartSuccess(response);
        } else {
            return of(new CartActions.AddOrRemoveItemFromCartFailure(`unable to add item to cart: ${response.status.message}`)); 
        }
    }

    addToCartFailure(err: any) {
        console.error(err);
        return of(new CartActions.AddOrRemoveItemFromCartFailure('error adding item to cart')); 
    }
}