import * as WingActions from './wing.action';
import _ from 'lodash';
import { Wing } from 'src/app/model/wing.model';

export interface State {
    wings: Wing[];
    qtyToPrice: any[];
}

const initlaTasks: State = {
    wings: [
        {
          'id': 0, 'name': 'Tradition Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing.jpg',
          quanties: [6, 12, 18, 24, 30],
          selectedQty: null,
          selectedPrice: null,
          prices: [7.59, 14.79, 20.99, 25.89, 30.99],
          flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
          selectedFlavor: null,
          isCurrentlySelected: false,
          hasFlavor: true
        },
        {
          'id': 1, 'name': 'Boneless Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing_boneless.jpg', 
          quanties: [6, 12, 18, 24, 30],
          selectedQty: null,
          selectedPrice: null,
          prices: [7.59, 14.79, 20.99, 40.99],
          flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
          selectedFlavor: null,
          isCurrentlySelected: false,
          hasFlavor: true
        },
        {
          'id': 2, 'name': 'Hot Wings', 'desc': 'Hot and delicious', 'img': 'assets/wings/hotwing.jpg', 
          quanties: [6, 12, 18, 24, 30],
          selectedQty: null,
          selectedPrice: null,
          prices: [7.59, 14.79, 20.99, 40.99],
          flavors: [],
          selectedFlavor: null,
          isCurrentlySelected: false,
          hasFlavor: false
        }
      ],
      qtyToPrice: [
        {'qty': 6, 'price': 7.59},
        {'qty': 12, 'price': 14.79},
        {'qty': 18, 'price': 20.99},
        {'qty': 24, 'price': 25.89},
        {'qty': 30, 'price': 30.99},
      ]
};

export function wingReducer(state: State = initlaTasks, action: WingActions.WingTaskActions) {
    switch(action.type)  {
        case WingActions.QTY_SELECTED_ACTION: 
            const selectedWingForQty: Wing = action.payload;
            const clonedWingsForQty = [...state.wings];
            //deep copy
            let deepClonedOfWingsForQty: Wing[] = clonedWingsForQty.map(wing=>{
                return {...wing};
            })
            deepClonedOfWingsForQty.map(wing=>{
                if(wing.id === selectedWingForQty.id) {
                    wing.isCurrentlySelected = true;
                    wing.selectedFlavor = selectedWingForQty.selectedFlavor;
                    wing.selectedPrice = selectedWingForQty.selectedPrice;
                    wing.selectedQty = selectedWingForQty.selectedQty;
                } else {
                    wing.isCurrentlySelected = false;
                }
            })
            return {
                ...state,
                wings: [...deepClonedOfWingsForQty]
            }
        default:
            return state;
    }
}