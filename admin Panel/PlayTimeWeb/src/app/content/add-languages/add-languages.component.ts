import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataService} from "../../data.service";
import {Languages} from "../../languages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.css']
})
export class AddLanguagesComponent implements OnInit {
  filteredOptions = [];
  language;
  languages = [];
  Categories = [];
  SubCategories = [];
  cycleData = [];
  options = [];
  flag = false;
  msgflag = false;
  message = '';

  constructor(private dataService: DataService, private Alllanguages: Languages, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.Categories = this.dataService.AllCategories.filter(items => items.removed === false);
    this.SubCategories = this.dataService.AllSubCategories.filter(items => items.removed === false);;
    this.Categories.forEach(items => {
      this.cycleData.push({
        category: items.category,
        subCategories: this.SubCategories.filter(item => item.category === items.category)
      });
    });
    this.languages =  this.Alllanguages.alllanguages;
    let haventLanguages = [];
    this.dataService.AllLanguages.forEach(items => {
      haventLanguages.push(items.language);
    });
    this.languages.forEach(items => {
      if (haventLanguages.indexOf(items.name) < 0) {
        this.options.push(items.name);
      }
    });
    this.filteredOptions = this.options;
  }
  ngOnInit() {
  }

  onInput(value: string): void {
    this.filteredOptions = this.options
      .filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
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
        setTimeout(_ => {this.router.navigate(['content', 'getLanguages']); }, 1000);
    } else if (compare === 'compare' && type === 'error') {
        this.msgflag = true;
        this.flag = false;
        this.message += ' / ' + msg;
    } else if (compare === 'compare' && type === 'success') {
        this.dataService.getAllData();
        this.msgflag = true;
        this.flag = true;
        this.message += ' / ' + msg;
        setTimeout(_ => {this.router.navigate(['content', 'getLanguages']); }, 1000);
    }
  }
  save() {
    this.cursor('start');
    let Categories: Array<string> =  this.filtetrValue(document.getElementsByClassName('categories'));
    let SubCategories: Array<string> = this.filtetrValue(document.getElementsByClassName('subcategories'));
    let categs = [];
    let subCategs = [];
    Categories.forEach(items => {
      categs.push({
        category: items['placeholder'],
        language: {
          name: this.languages.filter(item => item.name === this.language)[0].code,
          value: items['value']
        }
      });
    });
    SubCategories.forEach(items => {
      subCategs.push({
        category: items['placeholder'],
        subCategory: items['name'],
        language: {
          name: this.languages.filter(item => item.name === this.language)[0].code,
          value: items['value']
        }
      });
    });
    if (categs.length > 0) {
      this.dataService.addCategoryLanguage(categs).subscribe((data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.dataService.getAllData();
      }, (err) => {
        this.cursor('start');
        this.msg(err.error['message'], 'error', 'compare');

        this.cursor('stop');
      });
    } else {
      this.msg('have not bCategory Languages ...', 'error');
    }
    if (subCategs.length > 0) {
      this.dataService.addSubCategories(subCategs).subscribe((data) => {
        this.cursor('start');
        this.msg(data['message'], 'success', 'compare');
        this.cursor('stop');
        this.dataService.getAllData();
      }, (err) => {
        this.msg(err.error['message'], 'error', 'compare');
        this.cursor('stop');
      });
    } else {
      this.msg('have not SubCategory Languages ...', 'error');
    }
    let addedLangauge = {
      language: this.language,
      code: this.languages.filter(item => item.name === this.language)[0].code
    };
    console.log(addedLangauge);
    this.dataService.addLanguage(addedLangauge).subscribe((data) => {
      this.cursor('start');
      this.msg('Language has added ...', 'success', 'compare');
      this.cursor('stop');
        this.dataService.getAllData();
      },
    err => {
    this.cursor('start');
    this.msg('Langauge not added ...', 'error', 'compare');
    this.cursor('stop');
    }
    );
  }

}
