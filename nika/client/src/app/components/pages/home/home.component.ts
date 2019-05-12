import {Component, OnDestroy, OnInit} from '@angular/core';
import {SliderService} from '../../../_services/slider.service';
import {Slide} from '../../../_models/slide';
import {AppGlobals} from '../../../app.globals';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    options: any;
    speed: any;
    slides: Slide[];
    imageUrl;
    done = false;

    constructor(private  slider: SliderService, config: AppGlobals) {
        this.imageUrl = config.imageUrl + '/medias/';
        this.slider.getSliderSpeed().subscribe(data => {
            this.speed = data;
            this.options = {
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                pullDrag: false,
                dots: false,
                navSpeed: 200,
                autoplay: true,
                autoplayTimeout: this.speed || 3000,
                autoplaySpeed: 1000,
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
            };
            return;
        });
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
        this.slider.getImages().subscribe(data => {
            this.done = true;
            this.slides = data;
        });
    }

    ngOnDestroy(): void {
        // this.options = null;
        this.slides = null;
    }
}
