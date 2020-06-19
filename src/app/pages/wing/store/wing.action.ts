import { Action } from '@ngrx/store';
export const LOAD_INITIAL_WING = '[Wing] Load Initial Wing';
export const UPDATE_SELECTED_WING = '[Wing] Update Selected Wing';

export class LoadInitialWingTask implements Action {
    readonly type = LOAD_INITIAL_WING;
    constructor(public payload: any){}
}
export class UpdateSelectedWing implements Action {
    readonly type = UPDATE_SELECTED_WING;
    constructor(public payload: any){}
}

export type WingTaskActions = LoadInitialWingTask | UpdateSelectedWing;