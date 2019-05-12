import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {Languages} from "../../languages";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
categoryname = '';
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
    let inputLanguages: Array<string> =  this.filtetrValue(document.getElementsByClassName('languagesInput'));
    let categs = [];
    inputLanguages.forEach(items => {
      categs.push({
        category: this.categoryname,
        language: {
          name: items['name'],
          value: items['value'] ? items['value'] : this.categoryname
        }
      });
    });
    categs.push({
      category: this.categoryname,
      language: {
        name: 'en',
        value: this.categoryname
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

      this.dataService.addCategoryLanguage(categs).subscribe((data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
      }, (err) => {
        this.cursor('start');
        // this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      });
      let addedCategory = {
        category: this.categoryname
      };
      this.dataService.addCategory(addedCategory).subscribe(
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
