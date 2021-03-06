import * as fromToppingReducer from '../pages/pizza/topping/store/topping.reducer';
import * as fromPizzaReducer from '../pages/pizza/create/store/pizza.reducer';
import * as fromStartReducer from '../pages/pizza/checkout/start/store/start.reducer';
import * as fromRegisterReducer from '../pages/register/store/register.reducer';
import * as fromLoginReducer from '../pages/login/store/login.reducer';
import * as fromCartReducer from '../pages/cart/store/cart.reducer';
import * as fromWingReducer from '../pages/wing/store/wing.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    toppingReducer: fromToppingReducer.State,
    pizzaReducer: fromPizzaReducer.State,
    startReducer: fromStartReducer.State,
    registerReducer: fromRegisterReducer.State,
    loginReducer: fromLoginReducer.State,
    cartReducer: fromCartReducer.State,
    wingReducer: fromWingReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    toppingReducer: fromToppingReducer.toppingReducer,
    pizzaReducer: fromPizzaReducer.pizzaReducer,
    startReducer: fromStartReducer.startReducer,
    registerReducer: fromRegisterReducer.registerReducer,
    loginReducer: fromLoginReducer.loginReducer,
    wingReducer: fromWingReducer.wingReducer,
    cartReducer: fromCartReducer.cartReducer,
}