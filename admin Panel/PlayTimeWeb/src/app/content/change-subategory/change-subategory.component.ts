import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-subategory',
  templateUrl: './change-subategory.component.html',
  styleUrls: ['./change-subategory.component.css']
})
export class ChangeSubategoryComponent implements OnInit {

  subCategories = [];
  cycleData = [];
  disabled = true;
  msgflag;
  flag;
  message;
  unSubCategory;
  bol;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.subCategories = this.dataService.AllSubCategories.filter(items => items.removed === false && items.category === this.dataService.changedCategory)
      .sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));
    this.subCategories.forEach(items => {
      this.cycleData.push({
        category: items.category,
        subCategory: items.subCategory,
        imagesLength: this.dataService.AllImages
          .filter(item => item.subCategory === items.subCategory && item.removed === false).length,
        order: items.order
      });
    });
    this.unSubCategory = this.dataService.AllImages
      .filter(items => items.category === this.dataService.category && items.subCategory === 'unSubCategory').length;
    this.bol = Boolean(this.unSubCategory);
    this.cycleData.sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));

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
        setTimeout(_=> {this.msgflag = false}, 5000)
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
        setTimeout(_=> {this.msgflag = false}, 5000)
    } else if (compare === 'compare' && type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message += ' / ' + msg;
        setTimeout(_=> {this.msgflag = false; this.disabled = true}, 2000)
    }
  }
  ngOnInit() {

  }
  foo(item) {
    this.dataService.subCategory = item.subCategory;
    this.dataService.removed = false;
    this.router.navigate(['content', 'getImages']);
  }
  unSubCateg() {
    this.dataService.subCategory = 'unSubCategory';
    this.dataService.removed = false;
    this.router.navigate(['content', 'getImages'])
  }
  sortUp(item, index) {
    if (this.cycleData[index - 1]) {
      this.disabled = false;
      this.cycleData[index] = this.cycleData[index - 1];
      this.cycleData[index - 1] = item;
    }
    this.sort();
  };
  sortDown(item, index) {
    if (this.cycleData[index + 1]) {
      this.disabled = false;
      this.cycleData[index] = this.cycleData[index + 1];
      this.cycleData[index + 1] = item;
    }
    this.sort();
  }
  sort() {
    for(let i = 0; i < this.subCategories.length; i++) {
      this.subCategories[i].order = this.cycleData[i].order;
    }
  }
  save() {
    this.dataService.sortSubCategories(this.subCategories).subscribe(
      (data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.dataService.getAllData();
      },
      err => {
        this.cursor('start');
        this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      }
    );
  }
  rout() {
    this.router.navigate(['content', 'addSubCategory']);
  }
  edithSubCategory(item) {
    this.dataService.changedSubCategory = item.subCategory;
    this.router.navigate(['content', 'changeSubCategory'])
  }
  edithUnSubCategory() {
    this.dataService.changedSubCategory = 'unSubCategory';
    this.router.navigate(['content', 'changeSubCategory'])
  }
  removeSubCategory(item) {
    let data = {
      category: item.category,
      subCategory: item.subCategory
    };
    this.dataService.removeSubCategory(data).subscribe((data) => {
        this.cycleData = this.cycleData.filter(items => items.subCategory !== item.subCategory);
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
  removeUnSubCategory() {
    let data = {
      category: this.dataService.category,
      subCategory: 'unSubCategory'
    };
    this.dataService.removeSubCategory(data).subscribe((data) => {
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
