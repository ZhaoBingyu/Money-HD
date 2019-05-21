import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFixHeight]'
})
export class FixHeightDirective {

  constructor(private  el: ElementRef) {
    this.fixHeight();
  }

  @HostListener('window:load') onLoad() {
    this.fixHeight();
  }

  @HostListener('window:resize') onResize() {
    this.fixHeight();
  }

  @HostListener('mouseenter') noMouseEnter() {
    // this.el.nativeElement.style.backgroundColor = 'red';
  }


  fixHeight() {
    this.el.nativeElement.style.minHeight = document.documentElement.clientHeight - 64 - 46 + 'px';
  }
}
