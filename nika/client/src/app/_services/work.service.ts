import {Injectable} from '@angular/core';
import {Work} from '../_models/work';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../app.globals';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkService {

    works: Work[];
    work: Work;
    url;

    constructor(private http: HttpClient, private config: AppGlobals) {
        this.url = config.url;
    }

    getWorks(): Observable<Work[]> {
        return this.http.get<any[]>(`${this.url}/api/portfolio/`)
            .pipe(map(data => {
                    this.works = data.map(work => {
                        return {
                            id: work._id,
                            images: work.imgs,
                            title: work.title,
                            description: work.description,
                            link: work.link
                        };
                    });
                    return this.works;
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }

    findOne(id): Work {
        return this.works.find((element) => {
            return String(element.id) === String(id);
        });
    }
    getOne(id): Observable<Work> {
        return this.http.get<any>(`${this.url}/api/portfolio/${id}`)
            .pipe(map(work => {
                this.work = {
                    id: work._id,
                    title: work.title,
                    description: work.description,
                    images: work.imgs,
                    link: work.link
                };
                return this.work;
            }));
    }
}
