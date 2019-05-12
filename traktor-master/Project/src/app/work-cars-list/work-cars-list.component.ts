import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-work-cars-list',
  templateUrl: './work-cars-list.component.html',
  styleUrls: ['./work-cars-list.component.css']
})
export class WorkCarsListComponent implements OnInit {
works;
url;
  constructor(private router: Router, private service: DataService,  private title: Title, private meta: Meta) {
    window.scrollTo(0,0);
    this.url = this.service.url;
    this.service.getWorks(this.service.selectedCar).subscribe((data) => {
      this.works = data;
    });
    if (!this.service.selectedCar) {
      this.router.navigate(['']);
    }
    this.service.getMetaTags().subscribe((data) => {
      title.setTitle(data[1]['title']);
      meta.addTags([
        {name: 'keywords', content: data[1]['keywords']},
        {name: 'description', content: data[1]['description']}
      ]);
    });
  }

  ngOnInit() {
  }
  goToCarInfo(work) {
    this.service.selectedWork = work;
    this.router.navigate(['carInfo']);
  }

}
