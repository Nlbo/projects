import {Component, OnInit} from '@angular/core';
import {WorkService} from '../../../_services/work.service';
import {Work} from '../../../_models/work';
import {AppGlobals} from '../../../app.globals';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

    works: Work[];
    done = false;
    imageUrl;

    constructor(private service: WorkService, config: AppGlobals) {
        this.imageUrl = config.imageUrl + '/portfolio/';
    }

    ngOnInit() {
        this.getAllWorks();
    }

    getAllWorks() {
        if (this.service.works) {
            console.log(44);
            this.works = this.service.works;
            this.done = true;
        } else {
            this.service.getWorks().subscribe(
                data => {
                    this.works = data;
                    this.done = true;
                },
                err => console.log(err)
            );
        }
    }
}

