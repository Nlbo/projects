import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppGlobals {
  port = '3000';
  protocol = 'http';
  hostname = 'localhost';
  // hostname = 'nika.webi.am';
  url = this.protocol + '://' + this.hostname + ':' + this.port;
  constructor() {}
}
