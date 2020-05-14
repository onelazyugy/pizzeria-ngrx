import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import _ from 'lodash';
import { OrderSummary } from 'src/app/model/order-summary.model';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit, OnDestroy {
  pizzaSubscription: Subscription;
  orderId: number;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.pizzaSubscription = this.store.select('startReducer').subscribe(data => {
      const lastItem: OrderSummary = _.last(data.orderSummaries);
      this.orderId = lastItem.orderId;
    });
  }

  startNewOrder() {
    this.router.navigate(['/pizza']);
  }

  ngOnDestroy(): void {
    if(this.pizzaSubscription !== undefined) {
      this.pizzaSubscription.unsubscribe();
    }
  }

}
