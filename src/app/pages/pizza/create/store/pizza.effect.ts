import {Actions, ofType, Effect} from '@ngrx/effects';
import * as CartActions from '../../../cart/store/cart.action';
import {switchMap, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { AddPizzaToOrderResponse } from 'src/app/model/pizza.model';
import { Status } from 'src/app/model/wing.model';

@Injectable()
export class PizzaEffects {
    constructor(private actions$: Actions, private http: HttpClient, private helperService: HelperService){}
    @Effect()
    addPizzaToCartEffect = this.actions$.pipe(
        ofType(CartActions.ADD_PIZZA_TO_CART),
        switchMap((addPizzaToCartData: CartActions.AddPizzaToCartTask) => {
            const addPizzaToCartDataPayload = addPizzaToCartData.payload;
            return this.http.post<any>(environment.addPizzaToCartUrl, addPizzaToCartDataPayload)
            .pipe(
                map((response: AddPizzaToOrderResponse) => {
                    return this.addPizzaToCartSuccess(response);
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
                        return this.addPizzaToCartFailure(status);
                    } else if(err.status === 500) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.addPizzaToCartFailure(status);
                    } else if(err.status === 400) {
                        const status: Status = {
                            message: err.error.status.message,
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.addPizzaToCartFailure(status);
                    } else {
                        const status: Status = {
                            message: 'unknow error',
                            timestamp: '',
                            transactionId: '',
                            statusCd: err.status
                        }
                        return this.addPizzaToCartFailure(status);
                    }
                })
            );
        }),
    );

    addPizzaToCartSuccess(response: AddPizzaToOrderResponse) {
        if(response.success) {
            return new CartActions.AddPizzaToCartSuccess(response);
        } else {
            return this.addPizzaToCartFailure(response.status);
        }
    }

    addPizzaToCartFailure(status: Status) {
        const response: AddPizzaToOrderResponse = {
            status: status, 
            success: false,
            totalItemInCart: 0
        }
        return of(new CartActions.AddPizzaToCartFailure(response));
    }
}