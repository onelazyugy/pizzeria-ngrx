import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/model/ingredient.model';
export const TOPPING_SELECTED = '[Topping] Topping Selected';
export const TOPPING_DESELECTED = '[Topping] Topping Deselected';

export class SelectAToppingTask implements Action {
    readonly type = TOPPING_SELECTED;
    constructor(public payload: Ingredient){}
}

//typescript feature, the | is a typescript feature that says type WelcomeActions is either AddTask or AddTasks
export type ToppingTaskActions = SelectAToppingTask;