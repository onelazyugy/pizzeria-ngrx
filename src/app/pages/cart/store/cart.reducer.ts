import * as CartActions from './cart.action';
import _ from 'lodash';
import { AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
import { RetrieveCartResponse } from 'src/app/model/cart.model';

export interface State {
    addWingToOrderResponse: AddWingToOrderResponse;
    retrieveCartResponse: RetrieveCartResponse;
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
        totalItemInCart: 0,
    },
    retrieveCartResponse: {
            status: {
            timestamp: '',
            message: '',
            transactionId: '',
            statusCd: 0
        },
        success: false,
        cart: null
    }
};

export function cartReducer(state: State = initlaTasks, action: CartActions.CartTaskActions) {
    switch(action.type)  {
        case CartActions.ADD_ITEM_TO_CART:
            return {
               ...state
            }
        case CartActions.RETRIEVE_ALL_ITEM_FROM_CART: 
            return {
                ...state
            }    
        case CartActions.RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS:
            const retrieveCartResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...retrieveCartResponse}
            }
        case CartActions.CART_ACTION_SUCCESS:  
            const addWingToOrderResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...addWingToOrderResponse},
                retrieveCartResponse: {...state.retrieveCartResponse}
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
            const failureResponseForRetrieve: RetrieveCartResponse = {
                status: {
                    timestamp: '',
                    message: status.message,
                    transactionId: '',
                    statusCd: status.statusCd
                },
                success: false,
                cart: null
            }
            return {
                ...state,
                addWingToOrderResponse: {...failureResponse},
                retrieveCartResponse: {...failureResponseForRetrieve}
            }
        default:
            return state;
    }
}