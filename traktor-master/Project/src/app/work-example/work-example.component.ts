import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-work-example',
  templateUrl: './work-example.component.html',
  styleUrls: ['./work-example.component.css']
})
export class WorkExampleComponent implements OnInit {

  @Input()data;
  url;
  constructor(private service: DataService, private router: Router) {
    this.url = this.service.url;
  }

  ngOnInit() {
  }
  goToMore() {
    this.service.selectedWork = this.data;
    this.router.navigate(['carInfo']);
  }

}
