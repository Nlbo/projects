import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  flag = false;
  msgflag = false;
  message = '';
  categoryname;
  cycleData = [];
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.categoryname = this.dataService.changedCategory;
    this.dataService.AllCategoryLangauges
      .filter(item => item.category === this.categoryname)
      .forEach(items => {
      this.cycleData.push({
        language: items.language.name,
        value: items.language.value
      });
    });
  }
  filtetrValue(array) {
    let values = [];
    for(let i = 0; i < array.length; i++) {
      values.push({
        value: array[i]['value'],
        placeholder: array[i]['placeholder'],
        name: array[i]['name']
      });
    }
    return values;
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
    } else if (type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message = msg;
        setTimeout(_ => {this.router.navigate(['content', 'getCategory']); }, 1000);
    } else if (compare === 'compare' && type === 'error') {
        this.msgflag = true;
        this.flag = false;
        this.message += ' / ' + msg;
    } else if (compare === 'compare' && type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message += ' / ' + msg;
        setTimeout(_ => {this.router.navigate(['content', 'getCategory']); }, 1000);
    }
  }
  ngOnInit() {
  }
  save() {
    let result = [];
    let i = 0;
    let inputLanguages: Array<string> =  this.filtetrValue(document.getElementsByClassName('languagesInput'));
    let dataCategLangs = this.dataService.AllCategoryLangauges.filter(item => item.category === this.dataService.changedCategory);
    dataCategLangs.forEach(items => {
      items.category = this.categoryname;
      items.language = {
        name: inputLanguages[i]['name'],
        value: inputLanguages[i]['value']
      };
      result.push({
        items
      });
      ++i;
    });
    let changeCategory = {
      category: this.dataService.changedCategory,
      newCategory: this.categoryname,
    };
    this.dataService.changeCategory(changeCategory).subscribe(
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
    this.dataService.changeCategoryLanguages(result).subscribe(
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
