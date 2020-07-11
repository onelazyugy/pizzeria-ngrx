import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { AngularFlexLayoutModule } from 'src/app/angular-flex-layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    AntDesignCommonModule,
    AngularFlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CartModule { }