import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToppingComponent } from './topping.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { ShareModule } from 'src/app/share/share.module';



@NgModule({
  declarations: [ToppingComponent],
  imports: [
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
  ],
  exports: [
    ToppingComponent
  ]
})
export class ToppingModule { }
