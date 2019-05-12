import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-category',
  templateUrl: './get-category.component.html',
  styleUrls: ['./get-category.component.css']
})
export class GetCategoryComponent implements OnInit {
categories = [];
removedImagesLength = 0;
cycleData = [];
message;
flag;
msgflag;
disabled = true;
  constructor(private dataService: DataService,private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.categories = this.dataService.AllCategories.filter(items => items.removed === false)
      .sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));
    this.categories.forEach(items => {
      this.cycleData.push({
        category: items.category,
        subCategoryLength: this.dataService.AllSubCategories
          .filter(item => item.category === items.category && item.subCategory !== 'unSubCategory' && item.removed === false).length,
        imagesLength: this.dataService.AllImages.filter(item => item.category === items.category && item.removed === false).length,
        order: items.order
      })
    });
    this.cycleData.sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));
    this.removedImagesLength = this.dataService.AllImages.filter(item => item.removed === true).length
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
  }
  foo(item) {
    this.dataService.removed = false;
    this.dataService.category = item.category;
    this.dataService.changedCategory = item.category;
    if (item.subCategoryLength > 0) {
      this.router.navigate(['content', 'getSubcategory']);
    } else {
      this.dataService.subCategory = 'unSubCategory';
      this.dataService.category = item.category;
      this.dataService.changedCategory = item.category;
      this.dataService.removed = false;
      this.router.navigate(['content', 'getImages']);
    }
  }
  rout() {
    this.router.navigate(['content', 'addCategory']);
  }
  routremoved() {
    this.dataService.removed = true;
    this.router.navigate(['content', 'getImages'])
  }
  sortUp(item, index) {
    if (this.cycleData[index - 1]) {
      this.disabled = false;
      this.cycleData[index] = this.cycleData[index - 1];
      this.cycleData[index - 1] = item;
      this.sort();
    }
  };
  sortDown(item, index) {
    if (this.cycleData[index + 1]) {
      this.disabled = false;
      this.cycleData[index] = this.cycleData[index + 1];
      this.cycleData[index + 1] = item;
      this.sort();
    }
  }
  sort() {
    for(let i = 0; i < this.categories.length; i++) {
      this.categories[i].order = this.cycleData[i].order;
    }
  }
 save() {
    this.dataService.sortCategories(this.categories).subscribe((data) => {
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
  edithCategory(item) {
    this.dataService.getAllData();
    this.dataService.changedCategory = item.category;
    this.dataService.category = item.category;
    this.router.navigate(['content', 'changeCategory']);
  }
  deleteCategory(item) {
    let data = {
      category: item.category
    };
    this.dataService.removeCategory(data).subscribe((data) => {
        this.cycleData = this.cycleData.filter(items => items.category !== item.category);
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
