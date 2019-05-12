import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
cars;
vakans;
workExamples;
prices;
  metaTags;
  constructor(private router: Router, private service: DataService, private title: Title, private meta: Meta) {
    this.service.getPrices().subscribe((data) => {
      this.prices = data;
    });
    this.service.getCars().subscribe((data) => {
      this.cars = data;
    });
    this.service.getVakans().subscribe((data) => {
      this.vakans = data;
    });
    this.service.getWorkExamples().subscribe((data) => {
      this.workExamples = data;
    });
    this.service.getMetaTags().subscribe((data) => {
      this.metaTags = data;
      title.setTitle(data[0]['title']);
      meta.addTags([
        {name: 'keywords', content: data[0]['keywords']},
        {name: 'description', content: data[0]['description']}
      ]);
    });

  }

  ngOnInit() {
  }
  goToCarsList(item) {
    this.service.selectedCar = item.category;
    this.router.navigate(['carsList']);
  }

}
