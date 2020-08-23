import { Wing } from './wing.model';
import { Pizza } from './pizza.model';

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
    isRequestFromModal: boolean;
    action: string;
}

export class Cart {
    id: number;
    userId: number;
    wings: Wing[];
    pizzas: Pizza[];
}

export class CartSummary {
    subTotal: number;
    total: number;
    tax: number;
}

export class RemoveItemFromCartRequest {
    enc: string;
    type: string;
    wing: Wing;
}

export class RemoveItemFromCartResponse {
    status: Status;
    success: boolean;
    cart: Cart;
    totalItemInCart: number;
    cartSummary: CartSummary;
    isRequestFromModal: boolean;
    action: string;
}

export class UpdateItemFromCartRequest {
    enc: string;
    type: string;
    originalSelectedQty: number;
    originalSelectedFlavor: string;
    originalNumberOfOrder: number;
    wing: Wing;
}

export class UpdateItemFromCartResponse {
    status: Status;
    success: boolean;
    cart: Cart;
    totalItemInCart: number;
    cartSummary: CartSummary;
    isRequestFromModal: boolean;
    action: string;
}