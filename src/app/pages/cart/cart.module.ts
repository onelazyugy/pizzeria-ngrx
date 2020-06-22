import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    AntDesignCommonModule
  ]
})
export class CartModule { }
