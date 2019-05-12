import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent implements OnInit {

  @Input() block;
  hover = false;

  constructor() { }


  ngOnInit() {
  }

}
