import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {
  cycleDataItems;
  cycleDataSpans;
  msgflag;
  flag;
  message;
  constructor(private dataService: DataService,private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.cycleDataItems = this.dataService.changedImage;
    this.cycleDataSpans = Object.getOwnPropertyNames(this.cycleDataItems);
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
      setTimeout(_=> {this.router.navigate(['content', 'getImages'])}, 5000);
    } else if (type === 'success') {
      this.dataService.getAllData();
      this.msgflag = true;
      this.flag = true;
      this.message = msg;
      setTimeout(_=> {this.router.navigate(['content', 'getImages'])}, 2000);
    } else if (compare === 'compare' && type === 'error') {
      this.msgflag = true;
      this.flag = false;
      this.message += ' / ' + msg;
      setTimeout(_=> {this.router.navigate(['content', 'getImages'])}, 5000);
    } else if (compare === 'compare' && type === 'success') {
      this.dataService.getAllData();
      this.msgflag = true;
      this.flag = true;
      this.message += ' / ' + msg;
      setTimeout(_=> {this.router.navigate(['content', 'getImages'])}, 2000);
    }
  }
  ngOnInit() {
  }
save() {
  let x =  document.getElementsByTagName('input');
  let data = {};
  for (let i = 0; i < x.length; i++) {
    data[this.cycleDataSpans[i] + ''] = x[i]['value'];
  }
  this.dataService.changeImage(data).subscribe(
    (data) => {
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
