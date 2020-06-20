import { Action } from '@ngrx/store';
import { Wing } from 'src/app/model/wing.model';
export const LOAD_INITIAL_WING = '[Wing] Load Initial Wing';
export const UPDATE_SELECTED_WING = '[Wing] Update Selected Wing';
export const QTY_SELECTED_ACTION = '[Wing] Quantity Selected Action'

// export class LoadInitialWingTask implements Action {
//     readonly type = LOAD_INITIAL_WING;
//     constructor(public payload: any){}
// }
// export class UpdateSelectedWing implements Action {
//     readonly type = UPDATE_SELECTED_WING;
//     constructor(public payload: Wing){}
// }
export class QuantitySelectedAction implements Action {
    readonly type = QTY_SELECTED_ACTION;
    constructor(public payload: Wing){}
}
// export type WingTaskActions = LoadInitialWingTask | UpdateSelectedWing | QuantitySelectedAction;
export type WingTaskActions = QuantitySelectedAction;