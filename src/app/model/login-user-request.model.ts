export class LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginStatus {
    isLoggingIn: boolean;
    isLoginComplete: boolean;
    isLoginSuccess: boolean;
}