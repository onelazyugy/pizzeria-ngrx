import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    AppRoutingModule,
    AntDesignCommonModule,
    CommonModule
  ]
})
export class SummaryModule { }
