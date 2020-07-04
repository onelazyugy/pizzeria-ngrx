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

@Injectable() 
export class CartEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    //add item
    @Effect()
    addItemToCartEffects = this.actions$.pipe(
        ofType(CartActions.ADD_ITEM_TO_CART),
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

    //retrieve all item
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
                        let status: Status;
                        if(err.error === null) {
                            //generic response from server not custom
                            status = {
                                message: err.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        } else {
                            status = {
                                message: err.error.status.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        }
                        return this.retrieveCartFailure(status);
                    } else if(err.status === 500) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveCartFailure(status);
                    } else if(err.status === 400) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveCartFailure(status);
                    } else {
                        const status: Status = {
                            message: 'unknow error',
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveCartFailure(status);
                    }
                })
            )
        })
    )

    //retrieve count
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
                        let status: Status;
                        if(err.error === null) {
                            //generic response from server not custom
                            status = {
                                message: err.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        } else {
                            status = {
                                message: err.error.status.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        }
                        return this.retrieveTotalItemInCartCountFailure(status);
                    } else if(err.status === 500) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveTotalItemInCartCountFailure(status);
                    } else if(err.status === 400) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveTotalItemInCartCountFailure(status);
                    } else {
                        const status: Status = {
                            message: 'unknow error',
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.retrieveTotalItemInCartCountFailure(status);
                    }
                })
            )
        })
    )

    //remove
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
                        let status: Status;
                        if(err.error === null) {
                            //generic response from server not custom
                            status = {
                                message: err.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        } else {
                            status = {
                                message: err.error.status.message,
                                timestamp: '',
                                transactionId: '',
                                statusCd: err.status
                            } 
                        }
                        return this.removeItemFromCartFailure(status);
                    } else if(err.status === 500) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.removeItemFromCartFailure(status);
                    } else if(err.status === 400) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.removeItemFromCartFailure(status);
                    } else {
                        const status: Status = {
                            message: 'unkown error',
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.removeItemFromCartFailure(status);
                    }
                })
            )
        })
    )

    //--add to cart
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

    //--retrieve all items
    retrieveCartSuccess(response: RetrieveCartResponse) {
        if(response.success) {
            response.isRequestFromModal = false;
            response.action = 'RETRIEVE_ALL';
            return new CartActions.RetrieveAllItemFromCartTaskSuccess(response);
        } else {
            console.error(response.status.message);
            const status: Status = {
                message: response.status.message,
                statusCd: response.status.statusCd,
                transactionId: response.status.transactionId,
                timestamp: response.status.timestamp
            }
            const retrieveCartResponse: RetrieveCartResponse = {
                status: status,
                success: false,
                cart: null,
                totalItemInCart: 0,
                cartSummary: null,
                isRequestFromModal: false,
                action: 'RETRIEVE_ALL'
            }
            return of(new CartActions.RetrieveAllItemFromCartTaskFailure(retrieveCartResponse));
        }
    }
    retrieveCartFailure(status: Status) {
        console.error(status.message);
        const retrieveCartResponse: RetrieveCartResponse = {
            status: status,
            success: false,
            cart: null,
            totalItemInCart: 0,
            cartSummary: null,
            isRequestFromModal: false,
            action: 'RETRIEVE_ALL'
        }
        return of(new CartActions.RetrieveAllItemFromCartTaskFailure(retrieveCartResponse)); 
    }

    //--retrieve count
    retrieveTotalItemInCartCountSuccess(response: RetrieveCartResponse) {
        if(response.success) {
            response.isRequestFromModal = false;
            response.action = 'RETRIEVE_COUNT';
            return new CartActions.RetrieveAllItemFromCartTaskSuccess(response);
        } else {
            console.error(response.status.message);
            const status: Status = {
                message: response.status.message,
                statusCd: response.status.statusCd,
                transactionId: response.status.transactionId,
                timestamp: response.status.timestamp
            }
            const retrieveTotalItemInCartCountResponse: RetrieveCartResponse = {
                status: status,
                success: false,
                cart: null,
                totalItemInCart: 0,
                cartSummary: null,
                isRequestFromModal: false,
                action: 'RETRIEVE_COUNT'
            }
            return of(new CartActions.RetrieveAllItemFromCartTaskFailure(retrieveTotalItemInCartCountResponse));
        }
    }
    retrieveTotalItemInCartCountFailure(status: Status) {
        const retrieveTotalItemIntCartCountResponse: RemoveItemFromCartResponse = {
            status: status,
            success: false,
            cart: null,
            totalItemInCart: null,
            cartSummary: null,
            isRequestFromModal: false,
            action: 'RETRIEVE_COUNT'
        }
        return of(new CartActions.RetrieveAllItemFromCartTaskFailure(retrieveTotalItemIntCartCountResponse)); 
    }

    //--remove
    removeItemFromCartSuccess(response: RemoveItemFromCartResponse) {
        if(response.success) {
            response.isRequestFromModal = true;
            response.action = 'REMOVE';
            return new CartActions.RemoveItemFromCartTaskSuccess(response);
        } else {
            const status: Status = {
                message: response.status.message,
                statusCd: response.status.statusCd,
                transactionId: response.status.transactionId,
                timestamp: response.status.timestamp
            }
            const removeItemFromCartResponse: RemoveItemFromCartResponse = {
                status: status,
                success: false,
                cart: null,
                totalItemInCart: null,
                cartSummary: null,
                isRequestFromModal: true,
                action: 'REMOVE'
            }
            return of(new CartActions.RemoveItemFromCartTaskFailure(removeItemFromCartResponse));
        }
    }
    removeItemFromCartFailure(status: Status) {
        const response: RemoveItemFromCartResponse = {
            status: status,
            success: false,
            cart: null,
            totalItemInCart: null,
            cartSummary: null,
            isRequestFromModal: true,
            action: 'REMOVE'
        }
        return of(new CartActions.RemoveItemFromCartTaskFailure(response));
    }
    //--
}