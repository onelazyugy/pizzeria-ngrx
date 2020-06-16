import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-italicize]'
})
export class ItalicizeDirective {

  constructor(elr: ElementRef, renderer: Renderer2) {
    renderer.setStyle(elr.nativeElement, 'fontStyle', 'italic')
  }
}
