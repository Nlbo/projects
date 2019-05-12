import {Component, OnInit} from '@angular/core';
import {StoriesService} from '../../../_services/stories.service';
import {Post} from '../../../_models/post';
import {AppGlobals} from '../../../app.globals';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

    stories: Post[];
    done = false;
    imageUrl;

    constructor(private service: StoriesService, config: AppGlobals) {
        this.imageUrl = config.imageUrl + '/posts/';
    }

    ngOnInit() {
        this.getAllStories();
    }

    getAllStories() {
        if (this.service.stories) {
            this.stories = this.service.stories;
            this.done = true;
        } else {
            this.service.getAll().subscribe(
                data => {
                    this.stories = data;
                    this.done = true;
                },
                err => console.log(err)
            );
        }
    }

}
