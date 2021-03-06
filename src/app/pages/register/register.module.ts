import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    AppRoutingModule,
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
