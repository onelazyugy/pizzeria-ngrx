import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WingComponent } from './wing.component';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { ShareModule } from 'src/app/share/share.module';
import { AngularFlexLayoutModule } from 'src/app/angular-flex-layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WingComponent],
  imports: [
    CommonModule,
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
    AngularFlexLayoutModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class WingModule { }
