import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appHover3dRotate]'
})
export class Hover3dRotateDirective {

    @Input() bgColor;
    @HostListener('mouseenter') onMouseEnter() {
        this.rotate('e');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.rotate('l');
    }

    constructor(private el: ElementRef) {

    }

    rotate(e) {
        setTimeout(() => {
            e === 'e' ? this.el.nativeElement.children[0].children[1].children[0].children[0].children[0].style.display = 'none' :
                this.el.nativeElement.children[0].children[1].children[0].children[0].children[0].style.display = 'block';
            e === 'e' ? this.el.nativeElement.children[0].children[1].children[0].children[0].children[1].style.display = 'block' :
                this.el.nativeElement.children[0].children[1].children[0].children[0].children[1].style.display = 'none';
            this.el.nativeElement.children[0].style.backgroundColor = (e === 'e') ? 'black' : this.bgColor;

        }, 200);
        this.el.nativeElement.children[0].classList.toggle('dRotate');
    }
}


