import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimTextPipe, UppercaseTextPipe } from './pipe/app.pipe';
import { ShareComponent } from './share.component';
import { HighlightDirective } from './directive/highlight.directive';

@NgModule({
    declarations: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent,
        HighlightDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent,
        HighlightDirective
    ]
})
export class ShareModule {}
