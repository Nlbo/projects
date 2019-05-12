import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url;
  urlApi;
  candidatePortfolio;

  constructor(private http: HttpClient, config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getPortfolio() {
    return this.http.get(this.urlApi + '/portfolio')
  }
  postPortfolio(portfolio) {
    return this.http.post(this.urlApi + '/portfolio', portfolio)
  };
  putPortfolio(id, portfolio) {
    return this.http.put(this.urlApi + `/portfolio?id=` + id, portfolio);
  };
  deletePortfolio(portfolio) {
    return this.http.delete(this.urlApi + `/portfolio?id=${portfolio._id}`);
  }
}
