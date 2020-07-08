import { Action } from '@ngrx/store';
import { AddWingToOrderRequest, AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
import { RemoveItemFromCartResponse, UpdateItemFromCartResponse, UpdateItemFromCartRequest } from 'src/app/model/cart.model';
import { RetrieveCartRequest, RetrieveCartResponse } from 'src/app/model/cart.model';
export const ADD_ITEM_TO_CART = '[Cart] Add Item To Cart';
export const REMOVE_ITEM_FROM_CART = '[Cart] Remove Item From Cart';
export const REMOVE_ITEM_FROM_CART_SUCCESS = '[Cart] Remove Item From Cart Success';
export const REMOVE_ITEM_FROM_CART_FAILURE = '[Cart] Remove Item From Cart Failure';
export const CART_ACTION_SUCCESS = '[Cart] Add or Remove Item From Cart Success';
export const CART_ACTION_FAILURE = '[Cart] Add or Remove Item From Cart Failure';
export const RETRIEVE_ALL_ITEM_FROM_CART = '[Cart] Retrieve All Item From Cart';
export const RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS = '[Cart] Retrieve All Item From Cart Success';
export const RETRIEVE_ALL_ITEM_FROM_CART_FAILURE = '[Cart] Retrieve All Item From Cart Failure';
export const RETRIEVE_TOTAL_ITEM_COUNT_IN_CART = '[Cart] Retrieve Total Item Count In Cart';
export const RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_FAILURE = '[Cart] Retrieve Total Item Count In Cart Task Failure';
export const RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_SUCCESS = '[Cart] Retrieve Total Item Count In Cart Task Success';
export const UPDATE_ITEM_FROM_CART_TASK = '[Cart] Update Item From Cart Task';
export const UPDATE_ITEM_FROM_CART_SUCCESS = '[Cart] Update Item From Cart Success';
export const UPDATE_ITEM_FROM_CART_FAILURE = '[Cart] Update Item From Cart Failure';

//--add item
export class AddItemToCartTask implements Action {
    readonly type = ADD_ITEM_TO_CART;
    constructor(public payload: AddWingToOrderRequest){}
}
export class CartActionSuccess implements Action {
    readonly type = CART_ACTION_SUCCESS;
    constructor(public payload: AddWingToOrderResponse){}
}
export class CartActionFailure implements Action {
    readonly type = CART_ACTION_FAILURE;
    constructor(public payload: Status) {}
}

//--retrieve all item
export class RetrieveAllItemFromCartTask implements Action {
    readonly type = RETRIEVE_ALL_ITEM_FROM_CART;
    constructor(public payload: RetrieveCartRequest){}
}
export class RetrieveAllItemFromCartTaskSuccess implements Action {
    readonly type = RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: RetrieveCartResponse){}
}
export class RetrieveAllItemFromCartTaskFailure implements Action {
    readonly type = RETRIEVE_ALL_ITEM_FROM_CART_FAILURE;
    constructor(public payload: RetrieveCartResponse){}
}

//--retrieve count
export class RetrieveTotalItemCountInCartTask implements Action {
    readonly type = RETRIEVE_TOTAL_ITEM_COUNT_IN_CART;
    constructor(public payload: RetrieveCartRequest){}
}
export class RetrieveTotalItemCountInCartTaskSuccess implements Action {
    readonly type = RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_SUCCESS;
    constructor(public payload: RetrieveCartResponse){}
}
export class RetrieveTotalItemCountInCartTaskFailure implements Action {
    readonly type = RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_FAILURE;
    constructor(public payload: RetrieveCartResponse){}
}

//--remove item
export class RemoveItemFromCartTask implements Action {
    readonly type = REMOVE_ITEM_FROM_CART;
    constructor(public payload: any){}
}
export class RemoveItemFromCartTaskSuccess implements Action {
    readonly type = REMOVE_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: RemoveItemFromCartResponse) {}
}
export class RemoveItemFromCartTaskFailure implements Action {
    readonly type = REMOVE_ITEM_FROM_CART_FAILURE;
    constructor(public payload: RemoveItemFromCartResponse) {}
}

//--update item
export class UpdateItemFromCartTask implements Action {
    readonly type = UPDATE_ITEM_FROM_CART_TASK;
    constructor(public payload: UpdateItemFromCartRequest) {}
}
export class UpdateItemFromCartSuccess implements Action {
    readonly type = UPDATE_ITEM_FROM_CART_SUCCESS;
    constructor(public payload: UpdateItemFromCartResponse){}
}
export class UpdateItemFromCartFailure implements Action {
    readonly type = UPDATE_ITEM_FROM_CART_FAILURE;
    constructor(public payload: UpdateItemFromCartResponse){}
}

export type CartTaskActions = AddItemToCartTask | RemoveItemFromCartTask | 
CartActionSuccess | CartActionFailure | 
RetrieveAllItemFromCartTask | RetrieveAllItemFromCartTaskSuccess | RetrieveAllItemFromCartTaskFailure |
RetrieveTotalItemCountInCartTask | RemoveItemFromCartTaskSuccess | RemoveItemFromCartTaskFailure | 
RetrieveTotalItemCountInCartTaskSuccess | RetrieveTotalItemCountInCartTaskFailure | UpdateItemFromCartTask |
UpdateItemFromCartSuccess | UpdateItemFromCartFailure;