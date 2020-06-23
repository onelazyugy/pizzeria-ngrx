import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimTextPipe, UppercaseTextPipe } from './pipe/app.pipe';
import { ShareComponent } from './share.component';
import { HighlightDirective } from './directive/highlight.directive';
import { ItalicizeDirective } from './directive/italicize.directive';

@NgModule({
    declarations: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent,
        HighlightDirective,
        ItalicizeDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TrimTextPipe,
        UppercaseTextPipe,
        ShareComponent,
        HighlightDirective,
        ItalicizeDirective
    ]
})
export class ShareModule {}
