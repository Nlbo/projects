import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from "./app.globals";

@Injectable({
  providedIn: 'root'
})
export class DataService {
// url = window.location.origin;
url;
user;
  constructor(private http: HttpClient,private config: AppGlobals) {
    // this.url = config.protocol + '://' + config.hostname + ':' + config.port;
    this.url = config.url;
  }

  getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
  login(data) {
    return this.http.post(this.url + '/admin/auth/login', data);
  }
}
