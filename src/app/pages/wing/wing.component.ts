import { Component, OnInit } from '@angular/core';
import { Wing, AddWingToOrderRequest } from 'src/app/model/wing.model';
import _ from 'lodash';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../cart/store/cart.action';
import { HelperService } from 'src/app/service/pizzeria-helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    },
    {
      'id': 2, 'name': 'Hot Wings', 'desc': 'Hot and delicious', 'img': 'assets/wings/hotwing.jpg', 
      quanties: [6, 12, 18, 24, 30],
      selectedQty: null,
      selectedPrice: null,
      prices: [7.59, 14.79, 20.99, 40.99],
      flavors: [],
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


  constructor(private store: Store<fromApp.AppState>, private helperService: HelperService, private http: HttpClient) { }

  ngOnInit() {
    this.store.select('loginReducer').subscribe(response => {
      console.log(response);
    });
  }

  addToOrder(wing: Wing) {
    const user = JSON.parse(this.helperService.getObjectFromLocalStorage());
    const payLoad: AddWingToOrderRequest = {
      name: wing.name, 
      desc: wing.desc,
      img: wing.img,
      selectedPrice: wing.selectedPrice,
      selectedQty: +wing.selectedQty,
      selectedFlavor: wing.selectedFlavor,
      userId: user.id,
      wingId: wing.id
    }
    this.store.dispatch(
      new CartActions.AddItemToCartTask(payLoad)
    );
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

  test() {
    const payload = {
      "name": "Boneless Wings",
      "desc": "Juicy and tasty",
      "img": "assets/wings/wing_boneless.jpg",
      "selectedPrice": 14.79,
      "selectedQty": 12,
      "selectedFlavor": "Sweet and Sour",
      "userId": 4,
      "wingId": 1
    }
    
    // let headers = new HttpHeaders({
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNTkyNTE1MzE5LCJleHAiOjE1OTI1MTU2MTl9.FkBn46FtH2ienTdVsjIJKRwhACNSFXIp9kEAqld_e9o'

    // });
    // let options = { headers: headers };
    // this.http.post<any>('http://localhost:8282/pizzeria/api/v1/cart/add/wing', payload, options).subscribe(res=>{
    //   console.log(res);
    // })
    
    // let headers = new HttpHeaders();
    // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNTkyNTMyODA3LCJleHAiOjE1OTI1MzM3MDd9._hbo3qCrugS_vwR1N3KAm_T9wiOAfMWT7mFROAPH7-U');

    this.http.get<any>('http://localhost:8282/pizzeria/api/v1/user/topsecret').subscribe(res=> {
      console.log(res);
    });


    // this.http.get<any>('http://localhost:8282/pizzeria/api/v1/user/test').subscribe(res=> {
    //   console.log(res);
    // });
    
  }
}
