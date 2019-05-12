import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {

  flag = false;
  msgflag = false;
  message = '';
  subcategoryname;
  cycleData = [];
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.subcategoryname = this.dataService.changedSubCategory;
    this.dataService.AllSubCategoryLangauges
      .filter(item => item.subCategory === this.subcategoryname)
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
        setTimeout(_ => {this.router.navigate(['content', 'changeCategory']); }, 1000);
    } else if (compare === 'compare' && type === 'error') {
        this.msgflag = true;
        this.flag = false;
        this.message += ' / ' + msg;
    } else if (compare === 'compare' && type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message += ' / ' + msg;
        setTimeout(_ => {this.router.navigate(['content', 'changeCategory']); }, 1000);
    }
  }
  ngOnInit() {
  }
  save() {
    let i = 0;
    let inputLanguages: Array<string> =  this.filtetrValue(document.getElementsByClassName('languagesInput'));
    let dataCategLangs = this.dataService.AllSubCategoryLangauges.filter(item => item.subCategory === this.dataService.changedSubCategory);
    dataCategLangs.forEach(items => {
      items.SubCategory = this.subcategoryname;
      items.category = this.dataService.changedCategory;
      items.language = {
        name: inputLanguages[i]['name'],
        value: inputLanguages[i]['value']
      };
      ++i;
    });

    let changeSubCategory = {
      category: this.dataService.changedCategory,
      subCategory: this.dataService.changedSubCategory,
      newSubCategory: this.subcategoryname,
    };
    this.dataService.changeSubCategory(changeSubCategory).subscribe(
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
    this.dataService.changeSubCategoryLanguages(dataCategLangs).subscribe(
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
