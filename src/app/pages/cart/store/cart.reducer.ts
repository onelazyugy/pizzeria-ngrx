import * as CartActions from './cart.action';
import _ from 'lodash';
import { AddWingToOrderResponse, Status } from 'src/app/model/wing.model';
import { RetrieveCartResponse, CartSummary, RemoveItemFromCartResponse } from 'src/app/model/cart.model';

export interface State {
    addWingToOrderResponse: AddWingToOrderResponse;
    retrieveCartResponse: RetrieveCartResponse;
    totalItemInCart: number;
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
    },
    retrieveCartResponse: {
            status: {
            timestamp: '',
            message: '',
            transactionId: '',
            statusCd: 0
        },
        success: false,
        cart: null,
        totalItemInCart: 0,
        cartSummary: null,
        isRequestFromModal: false,
        action: null
    },
    totalItemInCart: 0,
};

export function cartReducer(state: State = initlaTasks, action: CartActions.CartTaskActions) {
    switch(action.type)  {
        case CartActions.ADD_ITEM_TO_CART:
            return {
               ...state
            }
        //--retrieve all
        case CartActions.RETRIEVE_ALL_ITEM_FROM_CART: 
            return {
                ...state
            }    
        case CartActions.RETRIEVE_ALL_ITEM_FROM_CART_SUCCESS:
            const retrieveAllItemFromCartSuccessResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...retrieveAllItemFromCartSuccessResponse},
                totalItemInCart: retrieveAllItemFromCartSuccessResponse.totalItemInCart
            }
        case CartActions.RETRIEVE_ALL_ITEM_FROM_CART_FAILURE:
            const retrieveAllItemFromCartFailureResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...retrieveAllItemFromCartFailureResponse},
                totalItemInCart: retrieveAllItemFromCartFailureResponse.totalItemInCart
            }
        //--

        //--retrieve count
        case CartActions.RETRIEVE_TOTAL_ITEM_COUNT_IN_CART:
            return {
                ...state
            }
        case CartActions.RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_SUCCESS:
            const retrieveTotalItemCountInCartSuccess = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...retrieveTotalItemCountInCartSuccess},
                totalItemInCart: retrieveTotalItemCountInCartSuccess.totalItemInCart
            }
        case CartActions.RETRIEVE_TOTAL_ITEM_COUNT_IN_CART_TASK_FAILURE:
            const retrieveTotalItemCountInCartFailure = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...retrieveTotalItemCountInCartSuccess},
                totalItemInCart: retrieveTotalItemCountInCartSuccess.totalItemInCart
            }

        //--remove
        case CartActions.REMOVE_ITEM_FROM_CART:
            return {
                ...state
            }
        case CartActions.REMOVE_ITEM_FROM_CART_SUCCESS:
            const removeItemFromCartResponseSuccess = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...removeItemFromCartResponseSuccess},
                totalItemInCart: removeItemFromCartResponseSuccess.totalItemInCart
            }
        case CartActions.REMOVE_ITEM_FROM_CART_FAILURE:
            const removeItemFromCartResponseFailure = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...state.addWingToOrderResponse},
                retrieveCartResponse: {...removeItemFromCartResponseFailure},
                totalItemInCart: removeItemFromCartResponseFailure.totalItemInCart
            }
        //--

        //add item
        case CartActions.CART_ACTION_SUCCESS:  
            const addWingToOrderResponse = action.payload;
            return {
                ...state,
                addWingToOrderResponse: {...addWingToOrderResponse},
                retrieveCartResponse: {...state.retrieveCartResponse},
                totalItemInCart: addWingToOrderResponse.totalItemInCart
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
                cart: null,
                totalItemInCart: 0,
                cartSummary: null,
                isRequestFromModal: false, //TODO
                action: null //TODO
            }
            return {
                ...state,
                addWingToOrderResponse: {...failureResponse},
                retrieveCartResponse: {...failureResponseForRetrieve}
            }
        //--

        //--update item
        case CartActions.UPDATE_ITEM_FROM_CART_TASK:
            return {
                ...state
            }
            case CartActions.UPDATE_ITEM_FROM_CART_SUCCESS:
                const updateItemFromCartResponseSuccess = action.payload;
                return {
                    ...state,
                    addWingToOrderResponse: {...state.addWingToOrderResponse},
                    retrieveCartResponse: {...updateItemFromCartResponseSuccess},
                    totalItemInCart: updateItemFromCartResponseSuccess.totalItemInCart
                }
            case CartActions.UPDATE_ITEM_FROM_CART_FAILURE:
                const updateItemFromCartResponseFailure = action.payload;
                return {
                    ...state,
                    addWingToOrderResponse: {...state.addWingToOrderResponse},
                    retrieveCartResponse: {...updateItemFromCartResponseFailure},
                    totalItemInCart: updateItemFromCartResponseFailure.totalItemInCart
                }
        default:
            return state;
    }
}