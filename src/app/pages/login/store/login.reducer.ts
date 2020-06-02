import * as LoginActions from './login.action';
import _ from 'lodash';
import { LoginStatus } from 'src/app/model/login-user-request.model';

export interface State {
    loginStatus: LoginStatus;
}

const initlaTasks: State = {
    loginStatus: {
        isLoggingIn: false,
        isLoginComplete: false,
        isLoginSuccess: false
    }
};

export function loginReducer(state: State = initlaTasks, action: LoginActions.LoginUserTaskActions) {
    switch(action.type)  {
        case LoginActions.START_LOGIN_USER:
            const loginStartStatus: LoginStatus = {
                isLoginSuccess: false,
                isLoggingIn: true,
                isLoginComplete: false
            }
            return {
               ...state,
               loginStatus: {...loginStartStatus}
            }
        case LoginActions.LOGIN_USER_SUCCESS: 
            const loginSuccessStatus = action.payload;
            return {
                ...state,
                loginStatus: {...loginSuccessStatus}
            }
        case LoginActions.LOGIN_USER_FAILURE:
            const loginFailureStatus = action.payload;
            return {
                ...state,
                loginStatus: {...loginFailureStatus}
            }
        case LoginActions.LOGOUT_USER: 
            const logoutUserStatus = action.payload;
            return {
                ...state,
                loginStatus: {...logoutUserStatus}
            }
        default:
            return state;
    }
}