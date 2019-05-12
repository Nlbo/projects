import {Component, OnInit} from '@angular/core';
import {ComponentService} from '../../../_services/component.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    footer;

    constructor(private componentService: ComponentService) {
    }

    ngOnInit() {
        this.getFooterBlock();
    }

    getFooterBlock() {
        this.footer = this.componentService.getFooter();
    }
}
