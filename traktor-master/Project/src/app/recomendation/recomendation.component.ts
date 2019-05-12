import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent implements OnInit {
@Input()data;
url;
  constructor(private service: DataService,private router: Router) {
    this.url = this.service.url;
  }

  ngOnInit() {
  }
  goToCarInfo(data) {
    this.service.selectedWork = data;
    this.router.navigate(['carInfo']);
  }

}
