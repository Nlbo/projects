import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  url;
  urlApi;
  candidateSlider;
  constructor(private http: HttpClient, private config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getSliders() {
    return this.http.get(this.urlApi + '/slider')
  }
  postSlider(post) {
    return this.http.post(this.urlApi + '/slider', post)
  };
  putSlider(id, slider) {
    return this.http.put(this.urlApi + `/slider?id=` + id, slider);
  };
  deleteSlider(slider) {
    return this.http.delete(this.urlApi + `/slider?id=${slider._id}`);
  }
  getImages() {
    return this.http.get(this.urlApi + '/slider/media');
  }
}
