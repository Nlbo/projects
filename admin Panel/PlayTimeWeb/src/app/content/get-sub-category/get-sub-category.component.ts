import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-sub-category',
  templateUrl: './get-sub-category.component.html',
  styleUrls: ['./get-sub-category.component.css']
})
export class GetSubCategoryComponent implements OnInit {
subCategories = [];
cycleData = [];
disabled = true;
  unSubCategory;
bol;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.routerUrl = this.router.url.slice(1);
    this.subCategories = this.dataService.AllSubCategories.filter(item => item.category == this.dataService.category && item.removed === false);
    this.subCategories.forEach(items => {
      this.cycleData.push({
        subCategory: items.subCategory,
        order: items.order,
        imagesLength: this.dataService.AllImages
          .filter(item => item.category === this.dataService.category && item.subCategory === items.subCategory
            && item.removed === false).length
      });
    });
    this.unSubCategory = this.dataService.AllImages
      .filter(items => items.category === this.dataService.category && items.subCategory === 'unSubCategory').length;
    this.bol = Boolean(this.unSubCategory);
    this.cycleData.sort((a, b) => (b.order < a.order) ? 1 : ((a.order < b.order) ? -1 : 0));

  }
  ngOnInit() {

  }
  foo(item){
    this.dataService.removed = false;
    this.dataService.subCategory = item.subCategory;
    this.dataService.removed = false;
    this.router.navigate(['content', 'getImages'])
  }
  unSubCateg() {
    this.dataService.removed = false;
    this.dataService.subCategory = 'unSubCategory';
    this.router.navigate(['content', 'getImages'])
  }

}
