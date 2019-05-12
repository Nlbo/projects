import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})


export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goTo(id) {
    if (id === 1) {
      $('.avtokran')[0].click();
    } else if (id === 2) {
      $('.avtovishka')[0].click();
    }
  }

}
