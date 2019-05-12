import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  url;
  urlApi;
  candidateBlock;
  constructor(private http: HttpClient, config: AppGlobals) {
    this.url = config.url;
    this.urlApi = config.url + '/admin';
  }
  getBlock() {
    return this.http.get(this.urlApi + '/block')
  }
  postBlock(block) {
    console.log('eeee');
    return this.http.post(this.urlApi + '/block', block)
  };
  putBlock(id, block) {
    return this.http.put(this.urlApi + `/block?id=` + id, block);
  };
  deleteBlock(block) {
    return this.http.delete(this.urlApi + `/block?id=${block._id}`);
  }
}
