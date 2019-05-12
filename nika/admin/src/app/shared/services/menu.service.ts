import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url;
  urlApi;
  candidateMenu;

  constructor(private http: HttpClient, config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getMenu(){
    return this.http.get(this.urlApi + '/menu');
  }
  addMenu(menu){
    return this.http.post(this.urlApi + '/menu', menu);
  }
  changeMenu(menu, id){
    return this.http.put(this.urlApi + `/menu?id=${id}`, menu);
  }
  deleteMenu(menu){
    return this.http.delete(this.urlApi + `/menu?id=${menu._id}`);
  }
  sortMenus(menus) {
    return this.http.put(this.urlApi + '/menu/sort', menus);
  }
}
