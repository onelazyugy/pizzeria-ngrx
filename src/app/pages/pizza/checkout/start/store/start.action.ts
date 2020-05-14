import { Action } from '@ngrx/store';
import { OrderSummary } from 'src/app/model/order-summary.model';
export const RESET_STORE = '[start] Reset store';
export const STORE_ORDER_SUMMARY = '[start] Store order summary'

export class ResetStoreTask implements Action {
    readonly type = RESET_STORE;
}

export class StoreOrderSummaryTask implements Action {
    readonly type = STORE_ORDER_SUMMARY;
    constructor(public payload: OrderSummary[]){}
}
export type StartTaskActions = ResetStoreTask | StoreOrderSummaryTask;