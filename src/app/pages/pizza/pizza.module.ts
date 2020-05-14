import { NgModule } from '@angular/core';
import { PizzaComponent } from './pizza.component';
import { CheckoutModule } from './checkout/checkout.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreateModule } from './create/create.module';
import { SummaryModule } from './summary/summary.module';

@NgModule({
  declarations: [PizzaComponent],
  imports: [
    AppRoutingModule,
    CheckoutModule,
    CreateModule,
    SummaryModule
  ]
})
export class PizzaModule { }
