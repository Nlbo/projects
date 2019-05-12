import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  url;
  urlApi;
  candidateVacancy;

  constructor(private http: HttpClient, config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getVacancy() {
    return this.http.get(this.urlApi + '/vacancy')
  }
  postVacancy(vacancy) {
    return this.http.post(this.urlApi + '/vacancy', vacancy)
  };
  putVacancy(id, vacancy) {
    return this.http.put(this.urlApi + `/vacancy?id=` + id, vacancy);
  };
  deleteVacancy(vacancy) {
    return this.http.delete(this.urlApi + `/vacancy?id=${vacancy._id}`);
  }
}
