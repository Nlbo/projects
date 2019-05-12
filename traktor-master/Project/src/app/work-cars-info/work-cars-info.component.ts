import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-work-cars-info',
  templateUrl: './work-cars-info.component.html',
  styleUrls: ['./work-cars-info.component.css']
})
export class WorkCarsInfoComponent implements OnInit {
 work;
  url;
  constructor(private service: DataService, private router: Router,  private title: Title, private meta: Meta) {
    window.scrollTo(0,0);
    if (!this.service.selectedWork) {
      this.router.navigate(['carsList']);
    }
    this.url = this.service.url;
    this.work = this.service.selectedWork;
    this.service.getMetaTags().subscribe((data) => {
      title.setTitle(data[2]['title']);
      meta.addTags([
        {name: 'keywords', content: data[2]['keywords']},
        {name: 'description', content: data[2]['description']}
      ]);
    });


  }

  ngOnInit() {
    let row = document.getElementById('roww');
    let img = document.getElementById('imgg');

    img.style.marginTop = row.offsetHeight / 4 + 'px';
  }

}
