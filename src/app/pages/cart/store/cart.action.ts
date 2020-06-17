import { Action } from '@ngrx/store';
export const ADD_ITEM_TO_CART = '[Cart] Add Item To Cart';
export const REMOVE_ITEM_FROM_CART = '[Cart] Remove Item From Cart';
export const ADD_OR_REMOVE_ITEM_FROM_CART_SUCCESS = '[Cart] Add or Remove Item From Cart Success'
export const ADD_OR_REMOVE_ITEM_FROM_CART_FAILURE = '[Cart] Add or Remove Item From Cart Failure'

export class AddItemToCartTask implements Action {
    readonly type = ADD_ITEM_TO_CART;
    constructor(public payload: any){}
}
export class RemoveItemFromCartTask implements Action {
    readonly type = REMOVE_ITEM_FROM_CART;
    constructor(public payload: any){}
}
export class AddOrRemoveItemFromCartSuccess implements Action {
    readonly type = ADD_OR_REMOVE_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: any){}
}
export class AddOrRemoveItemFromCartFailure implements Action {
    readonly type = ADD_OR_REMOVE_ITEM_FROM_CART_FAILURE;
    constructor(public payload: any) {}
}

export type CartTaskActions = AddItemToCartTask | RemoveItemFromCartTask | AddOrRemoveItemFromCartSuccess | AddOrRemoveItemFromCartFailure;