import {Injectable} from '@angular/core';
import {AppGlobals} from '../app.globals';
import {HttpClient} from '@angular/common/http';
import {Observable, of, pipe, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Post} from '../_models/post';

@Injectable({
    providedIn: 'root'
})
export class StoriesService {
    url;
    stories: Post[];
    story: Post;

    constructor(private http: HttpClient, private config: AppGlobals) {
        this.url = config.url;
    }

    getAll(): Observable<Post[]> {
        return this.http.get<any[]>(`${this.url}/api/post`)
            .pipe(map(data => {
                    this.stories = data.map(post => {
                        return {
                            id: post._id,
                            title: post.title,
                            description: post.description,
                            content: post.content,
                            image: post.image,
                            alt: post.alt,
                            createdAt: post.created,
                            updatedAt: post.updated,
                        };
                    });
                    return this.stories;
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                }));
    }


    getPost(id): Observable<Post> {
        return this.http.get<any>(`${this.url}/api/post/${id}`).pipe(map(post => {
            this.story = {
                id: post._id,
                title: post.title,
                description: post.description,
                content: post.content,
                image: post.image,
                alt: post.alt,
                createdAt: post.created,
                updatedAt: post.updated,
            };
            return this.story;
        }));
    }

    getById(id): Post {
        return this.stories.find((element) => {
            return String(element.id) === String(id);
        });
    }
}
