import { Action } from '@ngrx/store';
import { RegisterUserRequest, RegisterStatus } from 'src/app/model/register-user-request.model';
export const START_REGISTER_USER = '[Register] Start Register User';
export const REGISTER_USER_SUCCESS = '[Register] Register User Success';
export const REGISTER_USER_FAILURE = '[Register] Register User Failure';

export class StartRegisterUserTask implements Action {
    readonly type = START_REGISTER_USER;
    constructor(public payload: RegisterUserRequest){}
}
export class RegisterUserTaskSuccess implements Action {
    readonly type = REGISTER_USER_SUCCESS;
    constructor(public payload: RegisterStatus){}
}
export class RegisterUserTaskFailure implements Action {
    readonly type = REGISTER_USER_FAILURE;
    constructor(public payload: RegisterStatus){}
}
//typescript feature, the | is a typescript feature that says type WelcomeActions is either AddTask or AddTasks
export type RegisterUserTaskActions = StartRegisterUserTask | RegisterUserTaskSuccess | RegisterUserTaskFailure;