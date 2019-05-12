import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
// url = 'http://mvm-specstroy.ru:80';
url = window.location.origin;
  selectedCar;
  selectedWork;
  prices;
  constructor(private http: HttpClient) {
  }
  getCars() {
    return  this.http.get(this.url + '/cars');
  }
  getVakans() {
    return  this.http.get(this.url + '/vakans');
  }
  getWorkExamples() {
    return this.http.get(this.url + '/workexamples');
  }
  getWorks(car) {
    return this.http.get(this.url + `/works?category=${car}`);
  }
  getPrices() {
    return this.http.get(this.url + '/prices');
  }
  getMetaTags() {
    return this.http.get(this.url + '/metas');
  }
}
