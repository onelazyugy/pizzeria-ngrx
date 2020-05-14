import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimTextPipe, UppercaseTextPipe } from './pipe/app.pipe';
import { ShareComponent } from './share.component';

@NgModule({
    declarations: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent
    ]
})
export class ShareModule {}
