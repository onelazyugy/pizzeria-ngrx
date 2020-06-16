import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';
import { ToppingModule } from '../topping/topping.module';
import { AngularFlexLayoutModule } from 'src/app/angular-flex-layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
    FormsModule,
    ToppingModule,
    AngularFlexLayoutModule,
    FontAwesomeModule,
  ]
})
export class CreateModule { }
