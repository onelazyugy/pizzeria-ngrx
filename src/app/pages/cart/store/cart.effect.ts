import {Actions, ofType, Effect} from '@ngrx/effects';
import * as CartActions from './cart.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
import { RemoveItemFromCartResponse } from 'src/app/model/cart.model';
import { RetrieveCartResponse } from 'src/app/model/cart.model';

// effect is nothing much but piece of code that is similar to service for making http request or localstorage
// up to you to use effect or not since it is a matter of preference if you want to stick with ngrx rather than angular
@Injectable() // because we are injection services in the constructor 
export class CartEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect() // this is for ngrx effect to pick up this effect handler
    addItemToCartEffects = this.actions$.pipe(
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

    @Effect()
    retrieveCartEffect = this.actions$.pipe(
        ofType(CartActions.RETRIEVE_ALL_ITEM_FROM_CART),
        switchMap((requestPayload: CartActions.RetrieveAllItemFromCartTask)=>{
            return this.http.post<any>(environment.retrieveCartUrl, requestPayload.payload)
            .pipe(
                map((response: RetrieveCartResponse) => {
                    return this.retrieveCartSuccess(response);
                }),
                catchError(err => {
                    if(err.status === 403) {
                        const status: Status = {
                            message: 'session expired please log back in',
                            timestamp: '',
                            transactionId: '',
                            statusCd: 403
                        }
                        return this.retrieveCartFailure(status);
                    }
                    const status: Status = err.error.status;
                    return this.addToCartFailure(status);
                })
            )
        })
    )

    @Effect()
    retrieveTotalItemInCartCountEffect = this.actions$.pipe(
        ofType(CartActions.RETRIEVE_TOTAL_ITEM_COUNT_IN_CART),
        switchMap((requestPayload: CartActions.RetrieveTotalItemCountInCartTask)=>{
            return this.http.post<any>(environment.retrieveTotalItemInCartUrl, requestPayload.payload)
            .pipe(
                map((response: RetrieveCartResponse)=>{
                    return this.retrieveTotalItemInCartCountSuccess(response);
                }),
                catchError(err => {
                    if(err.status === 403) {
                        const status: Status = {
                            message: 'session expired please log back in',
                            timestamp: '',
                            transactionId: '',
                            statusCd: 403
                        }
                        return this.retrieveTotalItemInCartCountFailure(status);
                    }
                    const status: Status = err.error.status;
                    return this.retrieveTotalItemInCartCountFailure(status);
                })
            )
        })
    )

    @Effect()
    removeItemFromCart = this.actions$.pipe(
        ofType(CartActions.REMOVE_ITEM_FROM_CART),
        switchMap((requestPayload: CartActions.RemoveItemFromCartTask)=>{
            return this.http.post<any>(environment.removeItemFromCartUrl, requestPayload.payload)
            .pipe(
                map((response: RemoveItemFromCartResponse)=>{
                    return this.removeItemFromCartSuccess(response);
                }),
                catchError(err => {
                    if(err.status === 403) {
                        const status: Status = {
                            message: 'session expired please log back in',
                            timestamp: '',
                            transactionId: '',
                            statusCd: 403
                        }
                        return this.removeItemFromCartFailure(status);
                    }
                    const status: Status = err.error.status;
                    return this.removeItemFromCartFailure(status);
                })
            )
        })
    )

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

    retrieveCartSuccess(response: RetrieveCartResponse) {
        if(response.success) {
            return new CartActions.RetrieveAllItemFromCartTaskSuccess(response);
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

    retrieveCartFailure(status: Status) {
        console.error(status.message);
        return of(new CartActions.CartActionFailure(status)); 
    }

    retrieveTotalItemInCartCountSuccess(response: RetrieveCartResponse) {
        if(response.success) {
            return new CartActions.RetrieveAllItemFromCartTaskSuccess(response);
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

    retrieveTotalItemInCartCountFailure(status: Status) {
        console.error(status.message);
        return of(new CartActions.CartActionFailure(status)); 
    }

    removeItemFromCartSuccess(response: RemoveItemFromCartResponse) {
        if(response.success) {
            return new CartActions.RemoveItemFromCartTaskSuccess(response);
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

    removeItemFromCartFailure(status: Status) {
        console.error(status.message);
        return of(new CartActions.CartActionFailure(status));
    }
}