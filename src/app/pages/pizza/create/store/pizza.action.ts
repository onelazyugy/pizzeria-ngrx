import { Action } from '@ngrx/store';
import { Pizza, PizzaSize, DeliveryType } from 'src/app/model/pizza.model';
export const START_A_PIZZA = '[Pizza] Start a pizza';
export const SELECT_A_PIZZA_SIZE = '[Pizza] Select a pizza size';
export const SELECT_A_DELIVERY_TYPE = '[Pizza] Select a delivery type';

export class StartAPizzaTask implements Action {
    readonly type = START_A_PIZZA;
    constructor(public payload: Pizza){}
}
export class SelectAPizzaSize implements Action {
    readonly type = SELECT_A_PIZZA_SIZE;
    constructor(public payload: PizzaSize){}
}
export class SelectADeliveryType implements Action {
    readonly type = SELECT_A_DELIVERY_TYPE;
    constructor(public payload: DeliveryType){}
}
//typescript feature, the | is a typescript feature that says type WelcomeActions is either AddTask or AddTasks
export type PizzaTaskActions = StartAPizzaTask | SelectAPizzaSize | SelectADeliveryType;