import * as CartActions from './cart.action';
import _ from 'lodash';

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
        case CartActions.REMOVE_ITEM_FROM_CART:  
            return {
                ...state
            }
        default:
            return state;
    }
}