import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-languages',
  templateUrl: './get-languages.component.html',
  styleUrls: ['./get-languages.component.css']
})
export class GetLanguagesComponent implements OnInit {
langauges;
cycleData;
flag;
message;
msgflag;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.langauges = this.dataService.AllLanguages;
    this.cycleData = this.langauges;
    console.log(this.dataService.AllLanguages);
  }

  cursor(id) {
    if (id === 'start') {
      document.getElementsByTagName('body')[0].style.cursor = 'progress';
    } else if (id === 'stop') {
      document.getElementsByTagName('body')[0].style.cursor = 'default';
    }
  }
  msg(msg, type, compare = '') {
    if (type === 'error') {
        this.msgflag = true;
        this.flag = false;
        this.message = msg;
        setTimeout(_=> {this.msgflag = false}, 5000);
    } else if (type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message = msg;
        setTimeout(_=> {this.msgflag = false}, 2000);
    } else if (compare === 'compare' && type === 'error') {
        this.msgflag = true;
        this.flag = false;
        this.message += ' / ' + msg;
        setTimeout(_=> {this.msgflag = false}, 5000);
    } else if (compare === 'compare' && type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message += ' / ' + msg;
        setTimeout(_=> {this.msgflag = false}, 2000);
    }
  }
  ngOnInit() {
  }
  rout() {
    this.router.navigate(['content', 'addLanguage']);
  }
  removeLanguage(item) {
    this.dataService.removeLanguage(item).subscribe((data) => {
       this.cycleData =  this.cycleData.filter(items => items.language !== item.language);
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
      },
      err => {
        this.cursor('start');
        this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      }
    );
  }

}
