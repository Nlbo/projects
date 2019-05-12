import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-work-cars',
  templateUrl: './work-cars.component.html',
  styleUrls: ['./work-cars.component.css']
})
export class WorkCarsComponent implements OnInit {
@Input()data;
url;
  constructor(private service: DataService) {
    this.url = this.service.url;
  }

  ngOnInit() {
  }

}
