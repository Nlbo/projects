import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isCollapsed = false;
  constructor(private router: Router, private dataService: DataService, public urlService: DataService) {
    this.dataService.routerUrl = this.router.url.slice(1);

  }

  ngOnInit() {
  }

  foo(id) {
    this.dataService.getAllData();
    if (id === 1) {
      this.dataService.removed = false;
      this.router.navigate(['content', 'getCategory']);
    } else {
      this.dataService.removed = false;
      this.router.navigate(['content', 'getLanguages']);
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
