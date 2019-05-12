import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
user;
isCollapsed = false;
posts;
  @ViewChild('page') layot;
  constructor(private data: DataService, private router: Router) {
    if(!localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    // this.layot.elementRef.nativeElement.offsetHeight = window.innerHeight;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  logOut() {
    localStorage.clear();
    window.location.href = window.location.origin;
  }
}
