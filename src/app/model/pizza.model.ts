export interface PizzaImage {
    initialPizzaImage: string;
    endPizzaImage: string;
}

export interface PizzaSize {
    isSelected: boolean;
    value: string;
    label: string;
    id: number;
}

export interface DeliveryType {
    isSelected: boolean;
    value: string;
    label: string;
    id: number;
}

export class Pizza {
    id: number;
    size: PizzaSize[];
    price: number;
    typeOfImage: PizzaImage;
    deliveryType: DeliveryType[];

    constructor(id: number, size: PizzaSize[], price: number, typeOfImage: PizzaImage, deliveryType: DeliveryType[]){
        this.id = id; this.size = size; this.price = price; this.typeOfImage = typeOfImage; this.deliveryType = deliveryType;
    }
}

