import { Action } from '@ngrx/store';
import { AddWingToOrderRequest, AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
export const ADD_ITEM_TO_CART = '[Cart] Add Item To Cart';
export const REMOVE_ITEM_FROM_CART = '[Cart] Remove Item From Cart';
export const CART_ACTION_SUCCESS = '[Cart] Add or Remove Item From Cart Success'
export const CART_ACTION_FAILURE = '[Cart] Add or Remove Item From Cart Failure'

export class AddItemToCartTask implements Action {
    readonly type = ADD_ITEM_TO_CART;
    constructor(public payload: AddWingToOrderRequest){}
}
export class RemoveItemFromCartTask implements Action {
    readonly type = REMOVE_ITEM_FROM_CART;
    constructor(public payload: any){}
}
export class CartActionSuccess implements Action {
    readonly type = CART_ACTION_SUCCESS;
    constructor(public payload: AddWingToOrderResponse){}
}
export class CartActionFailure implements Action {
    readonly type = CART_ACTION_FAILURE;
    constructor(public payload: Status) {}
}

export type CartTaskActions = AddItemToCartTask | RemoveItemFromCartTask | CartActionSuccess | CartActionFailure;