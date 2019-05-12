import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bg-image-block',
  templateUrl: './bg-image-block.component.html',
  styleUrls: ['./bg-image-block.component.scss']
})
export class BgImageBlockComponent implements OnInit {

  @Input() block;
  constructor() { }

  ngOnInit() {
  }

}
