export class Wing {
    id: number;
    name: string;
    desc: string;
    img: string;
    quanties: number[];
    selectedPrice: number;
    selectedQty: number;
    prices: number[];
    flavors: string[];
    selectedFlavor: string;
    isCurrentlySelected: boolean;
    hasFlavor: boolean;
}

export class AddWingToOrderRequest {
    name: string; 
    desc: string;
    img: string;
    selectedPrice: number;
    selectedQty: number;
    selectedFlavor: string;
    userId: number;
    wingId: number;
    hasFlavor: boolean;
}

export interface Status {
    timestamp: string;
    message: string;
    transactionId: string;
    statusCd: number;
}

export class AddWingToOrderResponse {
    status: Status;
    success: boolean;
    totalItemInCart: number;
}