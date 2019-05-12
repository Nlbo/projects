import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url;
  urlApi;
  candidatePost;

  constructor(private http: HttpClient, private config: AppGlobals) {
    // this.url = config.protocol + '://' + config.hostname + ':' + config.port;
    // this.urlApi = config.protocol + '://' + config.hostname + ':' + config.port + '/api';
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getPosts() {
   return this.http.get(this.urlApi + '/post')
  }
  postPost(post) {
    return this.http.post(this.urlApi + '/post', post)
  };
  putPosts(id, post) {
    return this.http.put(this.urlApi + `/post?id=` + id, post);
  };
  deletePosts(post) {
    return this.http.delete(this.urlApi + `/post?id=${post._id}`);
  };
  ckeditorSaveImage(image) {
    return this.http.post(this.urlApi + '/post/ckeditor', image)
  }
}
