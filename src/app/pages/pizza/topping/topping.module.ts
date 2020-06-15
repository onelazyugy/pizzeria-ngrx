import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToppingComponent } from './topping.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { ShareModule } from 'src/app/share/share.module';
import { AngularFlexLayoutModule } from 'src/app/angular-flex-layout.module';

@NgModule({
  declarations: [ToppingComponent],
  imports: [
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
    AngularFlexLayoutModule
  ],
  exports: [
    ToppingComponent
  ]
})
export class ToppingModule { }
