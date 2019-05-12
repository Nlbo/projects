import { Component, OnInit } from '@angular/core';
import {Languages} from "../../languages";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
  subcategoryname = '';
  flag = false;
  msgflag = false;
  message = '';
  languages = [];
  cycleData = [];
  AllLangs;
  constructor(private dataService: DataService, private router: Router, private Alllanguages: Languages) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.AllLangs = this.Alllanguages.alllanguages;
    this.languages = this.dataService.AllLanguages;
    this.cycleData = this.languages;
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
        this.dataService.getAllData();
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
    let inputLanguages: Array<string> = this.filtetrValue(document.getElementsByClassName('languagesInput'));
    let subs = [];
    inputLanguages.forEach(items => {
      subs.push({
        subCategory: this.subcategoryname,
        category: this.dataService.changedCategory,
        language: {
          name: items['name'],
          value: items['value'] ? items['value'] : this.subcategoryname
        }
      });
    });
    subs.push({
      subCategory: this.subcategoryname,
      category: this.dataService.changedCategory,
      language: {
        name: 'en',
        value: this.subcategoryname
      }
    });
    let addedLangauge = {
      language: 'English',
      code: 'en'
    };
      this.dataService.addLanguage(addedLangauge).subscribe((data) => {
          this.cursor('start');
          this.msg('Language has added ...', 'success', 'compare');
          this.cursor('stop');
        },
        err => {
          this.cursor('start');
          this.cursor('stop');
        }
      );

      this.dataService.addSubCategoryLanguage(subs).subscribe((data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.dataService.getAllData();
      }, (err) => {
        this.cursor('start');
        // this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      });
    let addedSubCategory = {
      subCategory: this.subcategoryname,
      category: this.dataService.changedCategory
    };
      this.dataService.addSubCategory(addedSubCategory).subscribe(
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
}
