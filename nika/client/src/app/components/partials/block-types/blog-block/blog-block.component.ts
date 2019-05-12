import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-blog-block',
    templateUrl: './blog-block.component.html',
    styleUrls: ['./blog-block.component.scss']
})
export class BlogBlockComponent implements OnInit {

    @Input() block;


    constructor() {

    }

    ngOnInit() {
    }

    customOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: true,
        navSpeed: 200,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        // navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 1
            },
            940: {
                items: 1
            }
        },
        nav: false
    }
}
