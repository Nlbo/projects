import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appHoverOpacity]'
})
export class HoverOpacityDirective {

    headerDisplay = true;

    @HostListener('mouseenter') onMouseEnter() {
        this.opacity('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.opacity(null);
    }


    constructor(private el: ElementRef) {
        // console.log(el.nativeElement.children, el.nativeElement.style.backgroundColor)
    }

    opacity(color) {
        setTimeout(() => {
                // this.el.nativeElement.children[0].children[0].style.display = this.headerDisplay ? 'block' : 'none'
                this.headerDisplay = !this.headerDisplay;
            }
            , 0);
        this.el.nativeElement.children[0].children[0].classList.toggle('show-opacity');
    }
}
