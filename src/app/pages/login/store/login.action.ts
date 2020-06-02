import { Action } from '@ngrx/store';
// import { RegisterUserRequest, RegisterStatus } from 'src/app/model/register-user-request.model';
export const START_LOGIN_USER = '[Login] Start Login User';
export const LOGIN_USER_SUCCESS = '[Login] Login User Success';
export const LOGIN_USER_FAILURE = '[Login] Login User Failure';
export const LOGOUT_USER = '[Login] Logout User';

export class StartLoginUserTask implements Action {
    readonly type = START_LOGIN_USER;
    constructor(public payload: any){}
}
export class LoginUserTaskSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public payload: any){}
}
export class LoginUserTaskFailure implements Action {
    readonly type = LOGIN_USER_FAILURE;
    constructor(public payload: any){}
}
export class LogoutUserTask implements Action {
    readonly type = LOGOUT_USER;
    constructor(public payload: any){}
}
//typescript feature, the | is a typescript feature that says type WelcomeActions is either AddTask or AddTasks
export type LoginUserTaskActions = StartLoginUserTask | LoginUserTaskSuccess | LoginUserTaskFailure | LogoutUserTask;