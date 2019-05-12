import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
@Input()data;
keys = [];
cycleData= [];
  constructor() {
  }

  ngOnInit() {
    for(let item in this.data.prices) {
      this.keys.push(item);
    }
    for(let i = 0; i < this.keys.length;i++) {
      this.cycleData.push(this.data.prices[this.keys[i] + '']);
    }
  }

}
