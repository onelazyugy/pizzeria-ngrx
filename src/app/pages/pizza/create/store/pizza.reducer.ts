import * as PizzaActions from './pizza.action';
import _ from 'lodash';
import { Pizza, PizzaSize, DeliveryType } from 'src/app/model/pizza.model';

export interface State {
    pizza: Pizza;
}

const initlaTasks: State = {
    pizza: {
        'id': 0,
        'size': [{'id': 0, 'label': 'SMALL', 'isSelected': true, 'value': 'sm'}, {'id': 1, 'label': 'MEDIUM', 'isSelected': false, 'value': 'md'}, {'id': 2, 'label': 'LARGE', 'isSelected': false, 'value': 'lg'}],
        'price': 10.99,
        'typeOfImage': {
            'initialPizzaImage': 'assets/pizza/1pizza-no-decor.png',
            'endPizzaImage': 'assets/pizza/4pizza-final.png'
        },
        'deliveryType': [{'id': 0, 'label': 'PICKUP', 'isSelected': true, 'value': 'pickup'}, {'id': 1, 'label': 'DELIVERY', 'isSelected': false, 'value': 'delivery'}]
    }
};

export function pizzaReducer(state: State = initlaTasks, action: PizzaActions.PizzaTaskActions) {
    switch(action.type) {
        case PizzaActions.START_A_PIZZA:
            return {
                ...state,
                pizza: {...state.pizza}
            }
        case PizzaActions.SELECT_A_PIZZA_SIZE:
            const selectedPizzaSize: PizzaSize = action.payload;
            let clonedPizza = {...state.pizza};
            const updatedPizzaSizeArray: PizzaSize[] = clonedPizza.size.map(arrayElement => {
                if(arrayElement.id !== selectedPizzaSize.id) {
                    arrayElement = {...arrayElement, isSelected: false}//fix issue with mutating state
                } else {
                    arrayElement = {...arrayElement, isSelected: true}
                }
                return arrayElement;
            });
            clonedPizza.size = updatedPizzaSizeArray;
            return {
                ...state,
                pizza: {...clonedPizza}
            }
        case PizzaActions.SELECT_A_DELIVERY_TYPE:
            const selectedDeliveryType: DeliveryType = action.payload;
            let clonedPizza2 = {...state.pizza};
            const updatedPizzaDeliveryArray: DeliveryType[] = clonedPizza2.deliveryType.map(arrayElement => {
                if(arrayElement.id !== selectedDeliveryType.id) {
                    arrayElement = {...arrayElement, isSelected: false}//fix issue with mutating state
                } else {
                    arrayElement = {...arrayElement, isSelected: true}
                }
                return arrayElement;
            });
            clonedPizza2.deliveryType = updatedPizzaDeliveryArray;
            return {
                ...state,
                pizza: {...clonedPizza2}
            }
        default:
            return state;
    }
}