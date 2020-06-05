import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[app-high-light]'
})
export class HighlightDirective {

  constructor(elr: ElementRef) {
    elr.nativeElement.style.background = 'yellow';
  }

}
