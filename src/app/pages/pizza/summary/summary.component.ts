import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OrderSummary } from 'src/app/model/order-summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  startSubscription: Subscription;
  orderSummaries: OrderSummary[];
  
  constructor(private store: Store<fromApp.AppState>) { }
  
  ngOnInit() {
    this.startSubscription = this.store.select('startReducer').subscribe(data => {
      this.orderSummaries = data.orderSummaries;
    });
  }

  ngOnDestroy(): void {
    this.startSubscription.unsubscribe();
  }
}
