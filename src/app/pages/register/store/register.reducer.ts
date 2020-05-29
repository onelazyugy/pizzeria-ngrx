//alias import
import * as RegisterActions from './register.action';
import _ from 'lodash';
import { User } from 'src/app/model/user.model';

//define the type for our tasks
export interface State {
    isRegistering: boolean;
    isRegisteringComplete: boolean;
    isRegisterSuccess: boolean;
}

const initlaTasks: State = {
    isRegistering: false,
    isRegisteringComplete: false,
    isRegisterSuccess: false
};

export function registerReducer(state: State = initlaTasks, action: RegisterActions.RegisterUserTaskActions) {
    switch(action.type)  {
        case RegisterActions.START_REGISTER_USER:
           return {
               ...state,
               isRegisterSuccess: false,
               isRegistering: true,
               isRegisteringComplete: false
           }
        case RegisterActions.REGISTER_USER_SUCCESS: 
        const successStatus = action.payload;
        console.log('registration success: ', successStatus);
           return {
               ...state,
               isRegistering: false,
               isRegisteringComplete: true,
               isRegisterSuccess: true
           }
        case RegisterActions.REGISTER_USER_FAILURE:
            const failureStatus = action.payload;
            console.log('registration failure: ', failureStatus);
            return {
                ...state,
                isRegistering: false,
                isRegisteringComplete: true,
                isRegisterSuccess: false
            }
        default:
            return state;
    }
}