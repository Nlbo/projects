import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {StoriesService} from '../../../../_services/stories.service';
import {Post} from '../../../../_models/post';
import {AppGlobals} from '../../../../app.globals';

@Component({
    selector: 'app-story-detail',
    templateUrl: './story-detail.component.html',
    styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

    id: number;
    story: Post;
    imgPath;
    done = false;
    private routeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private service: StoriesService,
        config: AppGlobals
    ) {
        if ( service.stories ) {
            this.done = true;
        }
        this.imgPath = config.imageUrl + '/posts/';

    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.id = params.id;
            if (this.done) {
                this.story = this.service.getById(this.id);
            } else {
                    this.service.getPost(this.id).subscribe(
                        data => {
                            this.story = data;
                            this.done = true;
                        },
                        err => console.log(err)
                    );
            }
        });
    }

}

