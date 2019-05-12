import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-image',
  templateUrl: './get-image.component.html',
  styleUrls: ['./get-image.component.css']
})
export class GetImageComponent implements OnInit {
images = [];
cycleData = [];
options;
disabled = true;
orders = [];
  msgflag;
  flag;
  message;
  removed;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.removed = this.dataService.removed;
    if (this.dataService.removed) {
      this.images = this.dataService.AllImages
        .filter(items => items.removed === true)
        .sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));
      this.cycleData = this.images;
      this.images.forEach(items => {
        this.orders.push(items.order);
      });
    } else {
      this.images = this.dataService.AllImages
        .filter(items => items.category === this.dataService.category && items.subCategory === this.dataService.subCategory && items.removed === false)
        .sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));
      this.cycleData = this.images;
      this.images.forEach(items => {
        this.orders.push(items.order);
      });
    }
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
        setTimeout(_=> {this.msgflag = false; this.disabled = true}, 2000);
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
        setTimeout(_=> {this.msgflag = false; this.disabled = true}, 2000);
    }
  }
  ngOnInit() {
    this.options = {
      onUpdate: (event: any) => {
        this.disabled = false;
        for (let i = 0; i < this.cycleData.length; i++) {
          this.images[i].order = this.orders[i]
        }
      }
    };
  }
  save() {
      this.dataService.sortImages(this.images).subscribe(
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
  rout(){
    this.router.navigate(['content', 'addImage']);
  }
  removeImage(item) {
    console.log(item);
    this.dataService.removeImage(item).subscribe(
      (data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.cycleData = this.cycleData.filter(items => items._id !== item._id);
      },
      err => {
        this.cursor('start');
        this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      }
    );
  }
  changeImage(item){
    this.dataService.changedImage = item;
    console.log(item);
    this.router.navigate(['content', 'changeImage'])
  }
  recoverImage(item) {
    console.log(item);
    this.dataService.recoverImage(item).subscribe(
      (data) => {
        this.cursor('start');
        this.cycleData.filter(items => items._id !== item._id);
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.cycleData = this.cycleData.filter(items => items._id !== item._id);
      },
      err => {
        this.cursor('start');
        this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      }
    );
  }

}
