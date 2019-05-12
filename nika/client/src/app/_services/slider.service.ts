import {Injectable} from '@angular/core';
import {Slide} from '../_models/slide';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../app.globals';
import {Observable, of, pipe, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SliderService {

    slider: Slide[];
    url;
    speed;

    constructor(private http: HttpClient, private config: AppGlobals) {
        this.url = `${config.url}/api`;
    }

    getSliderSpeed(): Observable<any> {
        return this.http.get<any[]>(`${this.url}/settings/slider-speed`);
    }

    getImages(): Observable<Slide[]> {
        return this.http.get<any[]>(`${this.url}/slider`)
            .pipe(map(data => {
                    this.slider = data.map(slide => {
                        return {
                            title: slide.title,
                            description: slide.description,
                            url: slide.url,
                            image: slide.img.image,
                            alt: slide.img.alt
                        };
                    });
                    return this.slider;
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                })
            );
    }

    sliderOptions() {
        // return this.options;
    }
}
