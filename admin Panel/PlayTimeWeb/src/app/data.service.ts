import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
hostname: 'localhost';
port: 3000;
protocol: 'http';
URL = this.protocol + '://' + this.hostname + ':' + this.port + '/api/web/';
AllImages = [];
AllCategories = [];
AllCategoryLangauges = [];
AllSubCategories = [];
AllSubCategoryLangauges = [];
AllLanguages = [];
category = '';
subCategory = '';
logined = false;
changedImage = '';
changedCategory = '';
changedSubCategory = '';
routerUrl = '';
removed = false;
  constructor(private http: HttpClient) {
    this.hostname = 'localhost';
    this.port = 3000;
    this.protocol = 'http';
    this.URL = this.protocol + '://' + this.hostname + ':' + this.port + '/api/web/';
  }
  getAllData() {
    this.http.get(this.URL + 'categories').subscribe((data: any) => {
      this.AllCategories = data;
    });
    this.http.get(this.URL + 'categoryLanguages').subscribe((data: any) => {
      this.AllCategoryLangauges = data;
    });
    this.http.get(this.URL + 'subcategories').subscribe((data: any) => {
      this.AllSubCategories = data;
      console.log(this.AllSubCategories)
    });
    this.http.get(this.URL + 'subCategoryLanguages').subscribe((data: any) => {
      this.AllSubCategoryLangauges = data;
    });
    this.http.get(this.URL + 'languages').subscribe((data: any) => {
      this.AllLanguages = data;
    });
    this.http.get(this.URL + 'images').subscribe((data: any) => {
      this.AllImages = data;
    });
  }

  sortImages(data) {
    return this.http.put(this.URL + 'sortImages', data);
  }
  sortCategories(data) {
    return this.http.put( this.URL + 'sortCategories', data);
  }
  changeCategory(data) {
    return this.http.put(this.URL + 'changeCategory', data);
  }
  changeCategoryLanguages(data) {
    return this.http.put(this.URL + 'changeCategoryLanguages', data);
  }
  sortSubCategories(data) {
    return this.http.put( this.URL + 'sortSubCategories', data);
  }
  changeSubCategory(data) {
    return this.http.put(this.URL + 'changeSubCategory', data);
  }
  changeSubCategoryLanguages(data) {
    return this.http.put(this.URL + 'changeSubCategoryLanguages', data);
  }
  addCategory(data) {
    return this.http.post(this.URL + 'addCategory', data);
  }
  addSubCategory(data) {
    return this.http.post(this.URL + 'addSubCategory', data);
  }
  addLanguage(data) {
    return this.http.post(this.URL + 'addLanguage', data);
  }
  addSubCategories(data) {
    return this.http.post(this.URL + 'addSubCategory', data);
  }
  addCategoryLanguage(data) {
    return this.http.post(this.URL + 'addCategoryLanguage', data);
  }
  addSubCategoryLanguage(data) {
    return this.http.post(this.URL + 'addSubCategoryLanguage', data);
  }
  removeImage(item) {
    return this.http.post(this.URL + 'deleteImage', item);
  }
  removeCategory(item) {
    return this.http.post(this.URL + 'deleteCategory', item);
  }removeSubCategory(item) {
    return this.http.post(this.URL + 'deleteSubCategory', item);
  }
  removeLanguage(item) {
    return this.http.post(this.URL + 'deleteLanguage', item);
  }
  changeImage(data) {
    return this.http.put(this.URL + 'changeImage', data)
  }
  recoverImage(data) {
    return this.http.put (this.URL + 'recoverImage', data);
  }


}
