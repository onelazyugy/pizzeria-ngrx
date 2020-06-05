import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntDesignCommonModule } from 'src/app/ant-design-common.module';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartComponent } from './start.component';

@NgModule({
  declarations: [StartComponent],
  imports: [
    AntDesignCommonModule,
    ShareModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ]
})
export class StartModule { }
