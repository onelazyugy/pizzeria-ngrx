import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    AntDesignCommonModule,
    AppRoutingModule
  ]
})
export class RegisterModule { }
