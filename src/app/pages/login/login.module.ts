import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AntDesignCommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
