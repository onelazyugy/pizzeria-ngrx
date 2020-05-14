import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    declarations: [],
    exports: [
        NzButtonModule,
        NzInputModule,
        NzStepsModule,
        NzIconModule,
        NzGridModule,
        NzDividerModule,
        NzRadioModule,
        NzFormModule,
        NzDatePickerModule,
        NzSelectModule,
        NzResultModule,
        NzMenuModule,
        NzTableModule
    ]
})
export class AntDesignCommonModule {}