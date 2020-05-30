import * as RegisterActions from './register.action';
import _ from 'lodash';
import { User } from 'src/app/model/user.model';
import { RegisterStatus } from 'src/app/model/register-user-request.model';

export interface State {
    registerStatus: RegisterStatus;
}

const initlaTasks: State = {
    registerStatus: {
        isRegistering: false,
        isRegisteringComplete: false,
        isRegisterSuccess: false
    }
};

export function registerReducer(state: State = initlaTasks, action: RegisterActions.RegisterUserTaskActions) {
    switch(action.type)  {
        case RegisterActions.START_REGISTER_USER:
            const registerStartStatus: RegisterStatus = {
                isRegisterSuccess: false,
                isRegistering: true,
                isRegisteringComplete: false
            }
            return {
               ...state,
               registerStatus: {...registerStartStatus}
            }
        case RegisterActions.REGISTER_USER_SUCCESS: 
            const registerSuccessStatus = action.payload;
            return {
                ...state,
                registerStatus: {...registerSuccessStatus}
            }
        case RegisterActions.REGISTER_USER_FAILURE:
            const registerFailureStatus = action.payload;
            return {
                ...state,
                registerStatus: {...registerFailureStatus}
            }
        default:
            return state;
    }
}