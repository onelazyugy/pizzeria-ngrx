import * as StartActions from './start.action';
import { OrderSummary } from 'src/app/model/order-summary.model';
import _ from 'lodash';

export interface State {
  orderSummaries: OrderSummary[];
}

const initialTasks: State = {
  orderSummaries: [{
      orderId: 0,
      totalSelectedMeatTopping: 0,
      totalCostForSelectedMeatTopping: 0,
      totalSelectedVeggieTopping: 0,
      totalCostForSelectedVeggieTopping: 0,
      totalSelectedCheeseTopping: 0,
      totalCostForSelectedCheeseTopping: 0,
      pizzaBasePrice: 0,
      pizzaSize: 'small',
      subtotal: 0,
      taxPercent: '7%',
      totalTax: 0,
      totalDue: 0,
      deliveryType: 'pickup'
    }
  ]
}

// clear all store upon completed payment....will be similar when use logout
export function clearState(reducer) {
  return function (state, action) {
    if (action.type === StartActions.RESET_STORE) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export function startReducer(state: State = initialTasks, action: StartActions.StartTaskActions) {
  switch(action.type) {
    case StartActions.STORE_ORDER_SUMMARY: 
      const updatedOrderSummary: OrderSummary[] = action.payload;
      let copiedOrderSummaries = [...state.orderSummaries, ...updatedOrderSummary]
      copiedOrderSummaries = _.filter(copiedOrderSummaries, (o: OrderSummary) => {
        return o.orderId !== 0;
      })
      return {
        ...state,
        orderSummaries: [...copiedOrderSummaries]
      }
    default: 
      return state;
  }
}