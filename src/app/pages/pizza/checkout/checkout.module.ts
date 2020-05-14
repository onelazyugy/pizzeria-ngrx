import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { CompleteModule } from './complete/complete.module';
import { StartModule } from './start/start.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    AppRoutingModule,
    AntDesignCommonModule,
    CommonModule,
    CompleteModule,
    StartModule
  ]
})
export class CheckoutModule { }
