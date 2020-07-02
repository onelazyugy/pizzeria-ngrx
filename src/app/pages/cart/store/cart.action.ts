import { Action } from '@ngrx/store';
import { AddWingToOrderRequest, AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
import { RemoveItemFromCartResponse } from 'src/app/model/cart.model';
import { RetrieveCartRequest, RetrieveCartResponse } from 'src/app/model/cart.model';
export const ADD_ITEM_TO_CART = '[Cart] Add Item To Cart';
export const REMOVE_ITEM_FROM_CART = '[Cart] Remove Item From Cart';
export const REMOVE_ITEM_FROM_CART_SUCCESS = '[Cart] Remove Item From Cart Success';
export const CART_ACTION_SUCCESS = '[Cart] Add or Remove Item From Cart Success';
export const CART_ACTION_FAILURE = '[Cart] Add or Remove Item From Cart Failure';
export const RETRIEVE_ALL_ITEM_FROM_CART = '[Cart] Retrieve All Item From Cart';
export const RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS = '[Cart] Retrieve All Item From Cart Success';
export const RETRIEVE_TOTAL_ITEM_COUNT_IN_CART = '[Cart] Retrieve Total Item Count In Cart';


export class AddItemToCartTask implements Action {
    readonly type = ADD_ITEM_TO_CART;
    constructor(public payload: AddWingToOrderRequest){}
}
export class RemoveItemFromCartTask implements Action {
    readonly type = REMOVE_ITEM_FROM_CART;
    constructor(public payload: any){}
}
export class RetrieveAllItemFromCartTask implements Action {
    readonly type = RETRIEVE_ALL_ITEM_FROM_CART;
    constructor(public payload: RetrieveCartRequest){}
}
export class RetrieveTotalItemCountInCartTask implements Action {
    readonly type = RETRIEVE_TOTAL_ITEM_COUNT_IN_CART;
    constructor(public payload: RetrieveCartRequest){}
}
export class CartActionSuccess implements Action {
    readonly type = CART_ACTION_SUCCESS;
    constructor(public payload: AddWingToOrderResponse){}
}
export class CartActionFailure implements Action {
    readonly type = CART_ACTION_FAILURE;
    constructor(public payload: Status) {}
}
export class RetrieveAllItemFromCartTaskSuccess implements Action {
    readonly type = RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: RetrieveCartResponse){}
}
export class RemoveItemFromCartTaskSuccess implements Action {
    readonly type = REMOVE_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: RemoveItemFromCartResponse) {}
}

export type CartTaskActions = AddItemToCartTask | RemoveItemFromCartTask | 
CartActionSuccess | CartActionFailure | 
RetrieveAllItemFromCartTask | RetrieveAllItemFromCartTaskSuccess | 
RetrieveTotalItemCountInCartTask | RemoveItemFromCartTaskSuccess;