import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteComponent } from './complete.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';



@NgModule({
  declarations: [CompleteComponent],
  imports: [
    CommonModule,
    AntDesignCommonModule
  ]
})
export class CompleteModule { }
