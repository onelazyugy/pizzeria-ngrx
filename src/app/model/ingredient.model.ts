export class Ingredient {
    type: string;
    id: number; 
    name: string; 
    image: string;
    isSelected: boolean;
    constructor(type: string, id: number, name: string, image: string, isSelected: boolean){
        this.type = type; this.id = id; this.name = name; this.image = image; this.isSelected = isSelected;
    }
}
