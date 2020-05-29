export class RegisterUserRequest {
    email: string;
    password: string;
    confirmPassword: string;
    nickName: string;
}

export interface RegisterStatus {
    isRegistering: boolean;
    isRegisteringComplete: boolean;
    isRegisterSuccess: boolean;
}