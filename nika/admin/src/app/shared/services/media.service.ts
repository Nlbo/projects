import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  url;
  urlApi;
  candidateMedia;

  constructor(private http: HttpClient, config: AppGlobals) {
    // this.url = config.protocol + '://' + config.hostname + ':' + config.port;
    // this.urlApi = config.protocol + '://' + config.hostname + ':' + config.port + '/api';
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getMedias() {
    return this.http.get(this.urlApi + '/media')
  }
  postMedia(media) {
    return this.http.post(this.urlApi + '/media', media)
  };
  putMedia(id, media) {
    return this.http.put(this.urlApi + `/media?id=` + id, media);
  };
  deleteMedia(media) {
    return this.http.delete(this.urlApi + `/media?id=${media._id}`);
  }
}
