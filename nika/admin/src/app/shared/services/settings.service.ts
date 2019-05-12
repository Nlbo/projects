import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  url;
  urlApi;

  getSettings() {
    return this.http.get(this.urlApi + '/settings')
  };
  addSettings(settings) {
    return this.http.post(this.urlApi + '/settings', settings)
  };
  changeSettings(settings) {
    return this.http.put(this.urlApi + '/settings', settings)
  };
  deleteSettings(key) {
    return this.http.delete(this.urlApi + `/settings?key=${key}`)
  }
}
