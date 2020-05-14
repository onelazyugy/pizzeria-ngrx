//alias import
import * as ToppingActions from './topping.action';
import _ from 'lodash';
import { Ingredient } from 'src/app/model/ingredient.model';

//define the type for our tasks
export interface State {
    cheeses: Ingredient[];
    meats: Ingredient[];
    veggies: Ingredient[];

    //selected
    selectedCheeses: Ingredient[];
    selectedMeats: Ingredient[];
    selectedVeggies: Ingredient[];
}

const initlaTasks: State = {
    cheeses: [
        {'type': 'cheese', 'id': 0, 'name': 'mozzarella', 'image': 'assets/cheese/moz.jpg', 'isSelected': false}, {'type': 'cheese', 'id': 1, 'name': 'cheddar/matured cheddar', 'image': 'assets/cheese/cheddar.jpg', 'isSelected': false}, 
        {'type': 'cheese', 'id': 2, 'name': 'aged havarti', 'image': 'assets/cheese/havarti.jpg', 'isSelected': false}, {'type': 'cheese', 'id': 3, 'name': 'gorgonzola', 'image': 'assets/cheese/gorgonzola.jpg', 'isSelected': false}, 
        {'type': 'cheese', 'id': 4, 'name': 'parmigiano-reggiano', 'image': 'assets/cheese/parmi.jpg', 'isSelected': false}
    ],
    meats: [
        {'type': 'meat', 'id': 0, 'name':'Philly Steak', 'image':'assets/meat/phillisteak.jpg', 'isSelected': false}, {'type': 'meat', 'id': 1, 'name':'Beef', 'image':'assets/meat/beef.jpg', 'isSelected': false}, 
        {'type': 'meat', 'id': 2, 'name':'Spicy Italian Sausag', 'image':'assets/meat/sausage.jpg', 'isSelected': false}, {'type': 'meat', 'id': 3, 'name':'Meatball', 'image':'assets/meat/meatballs.jpg', 'isSelected': false}, 
        {'type': 'meat', 'id': 4, 'name':'Grilled Chicken', 'image':'assets/meat/grilled-chicken.jpg', 'isSelected': false}
    ],
    veggies: [
        {'type': 'veggie', 'id': 0, 'name':'Green Peppers', 'image': 'assets/veggie/green-pepper.jpg', 'isSelected': false}, {'type': 'veggie', 'id': 1, 'name': 'Roma Tomatoes', 'image': 'assets/veggie/tomato.png', 'isSelected': false}, 
        {'type': 'veggie', 'id': 2, 'name': 'Onions', 'image': 'assets/veggie/onions.jpg', 'isSelected': false}, {'type': 'veggie', 'id': 3, 'name': 'Jalapeño Peppers', 'image': 'assets/veggie/jal.jpg', 'isSelected': false}, 
        {'type': 'veggie', 'id': 4, 'name': 'Mushrooms', 'image': 'assets/veggie/mushrooms.jpg', 'isSelected': false}, {'type': 'veggie', 'id': 5, 'name': 'Pineapple', 'image': 'assets/veggie/pine.jpg', 'isSelected': false}, 
        {'type': 'veggie', 'id': 6, 'name': 'Black Olives', 'image': 'assets/veggie/olive.jpg', 'isSelected': false}, {'type': 'veggie', 'id': 7, 'name': 'Fresh Spinach', 'image': 'assets/veggie/spin.jpg', 'isSelected': false}, 
        {'type': 'veggie', 'id': 8, 'name': 'Banana Peppers', 'image': 'assets/veggie/ban-pep.png', 'isSelected': false}
    ],

    //selected
    selectedCheeses:[],
    selectedMeats:[],
    selectedVeggies:[]
};

export function toppingReducer( state: State = initlaTasks, action: ToppingActions.ToppingTaskActions) {
    switch(action.type)  {
        case ToppingActions.TOPPING_SELECTED:
            let selectedIngredient: Ingredient = action.payload;
            if(selectedIngredient.type === 'cheese') {
                let copiedCurrentCheeses = [...state.cheeses];
                copiedCurrentCheeses = _.remove(copiedCurrentCheeses, (element: Ingredient) => {
                    return element.id !== selectedIngredient.id;
                });
                const newCopiedCheeses = _.sortBy([...copiedCurrentCheeses, selectedIngredient], ['id']);
                const selectedCheeses = _.filter(newCopiedCheeses, {'isSelected': true})
                return  {
                    ...state, 
                    cheeses: [...newCopiedCheeses],
                    meats: [...state.meats],
                    veggies: [...state.veggies],
                    //selected 
                    selectedCheeses: [...selectedCheeses],
                    selectedMeats: [...state.selectedMeats],
                    selectedVeggies: [...state.selectedVeggies]
                }
            } else if(selectedIngredient.type === 'meat') {
                let copiedCurrentMeats = [...state.meats];
                copiedCurrentMeats = _.remove(copiedCurrentMeats, (element: Ingredient) => {
                    return element.id !== selectedIngredient.id;
                });
                const newCopiedMeats = _.sortBy([...copiedCurrentMeats, selectedIngredient], ['id']);
                const selectedMeats = _.filter(newCopiedMeats, {'isSelected': true})
                return  {
                    ...state, 
                    cheeses: [...state.cheeses],
                    meats: [...newCopiedMeats],
                    veggies: [...state.veggies],
                    //selected 
                    selectedCheeses: [...state.selectedCheeses],
                    selectedMeats: [...selectedMeats],
                    selectedVeggies: [...state.selectedVeggies]
                }
            } else {
                let copiedCurrentVeggies = [...state.veggies];
                copiedCurrentVeggies = _.remove(copiedCurrentVeggies, (element: Ingredient) => {
                    return element.id !== selectedIngredient.id;
                });
                const newCopiedVeggies = _.sortBy([...copiedCurrentVeggies, selectedIngredient], ['id']);
                const selectedVeggies = _.filter(newCopiedVeggies, {'isSelected': true})
                return  {
                    ...state, 
                    cheeses: [...state.cheeses],
                    meats: [...state.meats],
                    veggies: [...newCopiedVeggies],
                    //selected 
                    selectedCheeses: [...state.selectedCheeses],
                    selectedMeats: [...state.selectedMeats],
                    selectedVeggies: [...selectedVeggies]
                }
            }
        default:
            return state;
    }
}