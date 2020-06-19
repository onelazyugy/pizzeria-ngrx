import * as CartActions from './cart.action';
import _ from 'lodash';
import { AddWingToOrderResponse, Status } from 'src/app/model/wing.model';

export interface State {
    addWingToOrderResponse: AddWingToOrderResponse;
}

const initlaTasks: State = {
    addWingToOrderResponse: {
        status: {
            timestamp: '',
            message: '',
            transactionId: '',
            statusCd: 0
        },
        success: false,
        totalItemInCart: 0
    }
};

export function cartReducer(state: State = initlaTasks, action: CartActions.CartTaskActions) {
    switch(action.type)  {
        case CartActions.ADD_ITEM_TO_CART:
            return {
               ...state
            }
        case CartActions.CART_ACTION_SUCCESS:  
            const addWingToOrderResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...addWingToOrderResponse}
            }
        case CartActions.CART_ACTION_FAILURE:  
            const status: Status = action.payload;
            const failureResponse: AddWingToOrderResponse = {
                status: {
                    timestamp: '',
                    message: status.message,
                    transactionId: '',
                    statusCd: status.statusCd
                },
                success: false,
                totalItemInCart: 0
            }
            return {
                ...state,
                addWingToOrderResponse: {...failureResponse}
            }
        default:
            return state;
    }
}