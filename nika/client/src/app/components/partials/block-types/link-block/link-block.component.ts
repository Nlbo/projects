import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-link-block',
    templateUrl: './link-block.component.html',
    styleUrls: ['./link-block.component.scss']
})
export class LinkBlockComponent implements OnInit {

    @Input() block;

    constructor() {
    }

    ngOnInit() {
        // console.log(this.block.content);
    }

}
