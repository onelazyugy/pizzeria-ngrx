import { Component, OnInit } from '@angular/core';
import { Wing } from 'src/app/model/wing.model';
import _ from 'lodash';

@Component({
  selector: 'app-wing',
  templateUrl: './wing.component.html',
  styleUrls: ['./wing.component.css']
})
export class WingComponent implements OnInit {
  wings: Wing[] = [
    {
      'id': 0, 'name': 'Tradition Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing.jpg',
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 25.89, 30.99],
      flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
      selectedFlavor: null
    },
    {
      'id': 1, 'name': 'Boneless Wings', 'desc': 'Juicy and tasty', 'img': 'assets/wings/wing_boneless.jpg', 
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 40.99],
      flavors: ['Honey BBQ', 'Lemon Pepper', 'Sweet and Sour'],
      selectedFlavor: null
    }
  ];

  qtyToPriceMap: any[] = [
    {'qty': 6, 'price': 7.59},
    {'qty': 12, 'price': 14.79},
    {'qty': 18, 'price': 20.99},
    {'qty': 24, 'price': 25.89},
    {'qty': 30, 'price': 30.99},
  ]


  constructor() { }

  ngOnInit() {
  }

  add(id: number) {
    console.log('id: ' + id + ' | ' + this.wings[id].selectedQty + " | " + this.wings[id].selectedPrice);
  }

  qtyDropdownSelect(id: number) {
    console.log('id: ' + id + ' qty: ' + this.wings[id].selectedQty);
    const qtyToPriceObjs = _.filter(this.qtyToPriceMap, ['qty', +this.wings[id].selectedQty]);
    if(qtyToPriceObjs[0] !== undefined) {
      this.wings[id].selectedPrice = qtyToPriceObjs[0].price;
    }
  }

  flavorDropdownSelect(id: number) {
    console.log('id: ' + id + ' qty: ' + this.wings[id].selectedFlavor);
  }

}
