import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { CheckoutComponent } from './pages/pizza/checkout/checkout.component';
import { CreateComponent } from './pages/pizza/create/create.component';
import { CompleteComponent } from './pages/pizza/checkout/complete/complete.component';
import { StartComponent } from './pages/pizza/checkout/start/start.component';
import { SummaryComponent } from './pages/pizza/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    component: PizzaComponent,
    children: [
      {path: '', component: CreateComponent}, // if user navigate to /pizza, it will render CreateComponent
      {
        path: 'checkout', 
        component: CheckoutComponent,
        children: [
          {path: '', component: StartComponent},
          {path: 'complete', component: CompleteComponent}
        ]
      },
      {path: 'summary', component: SummaryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
