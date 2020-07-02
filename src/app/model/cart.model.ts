import { Wing } from './wing.model';

export class RetrieveCartRequest {
    userId: number;
	email: string;
}

export interface Status {
    timestamp: string;
    message: string;
    transactionId: string;
    statusCd: number;
}

export class RetrieveCartResponse {
    status: Status;
    success: boolean;
    cart: Cart;
    totalItemInCart: number;
    cartSummary: CartSummary;
    isShowMessage: boolean;
}

export class Cart {
    id: number;
    userId: number;
    wings: Wing[];
}

export class CartSummary {
    subTotal: number;
    total: number;
    tax: number;
}

export class RemoveItemFromCartRequest {
    enc: string;
    type: string;
    itemId: number;
}

export class RemoveItemFromCartResponse {
    status: Status;
    success: boolean;
    cart: Cart;
    totalItemInCart: number;
    cartSummary: CartSummary;
}