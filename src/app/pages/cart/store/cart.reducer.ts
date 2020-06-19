import * as CartActions from './cart.action';
import _ from 'lodash';
import { AddWingToOrderResponse } from 'src/app/model/wing.model';

export interface State {
    
}

const initlaTasks: State = {
    
};

export function cartReducer(state: State = initlaTasks, action: CartActions.CartTaskActions) {
    switch(action.type)  {
        case CartActions.ADD_ITEM_TO_CART:
            return {
               ...state
            }
        case CartActions.ADD_OR_REMOVE_ITEM_FROM_CART_SUCCESS:  
            const addItemToCartResponseSuccess: AddWingToOrderResponse = action.payload;
            console.log(addItemToCartResponseSuccess)
            return {
                ...state
            }
        case CartActions.ADD_OR_REMOVE_ITEM_FROM_CART_FAILURE:  
            const addItemToCartResponseFailure = action.payload;
            console.log(addItemToCartResponseFailure)
            return {
                ...state
            }
        default:
            return state;
    }
}