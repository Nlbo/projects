import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {AboutComponent} from './components/pages/about/about.component';
import {SidebarComponent} from './components/partials/sidebar/sidebar.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WorkComponent} from './components/pages/work/work.component';
import {StoriesComponent} from './components/pages/stories/stories.component';
import {CareersComponent} from './components/pages/careers/careers.component';
import {ImageBlockComponent} from './components/partials/block-types/image-block/image-block.component';
import {AllBlocksComponent} from './components/partials/all-blocks/all-blocks.component';
import {BlogBlockComponent} from './components/partials/block-types/blog-block/blog-block.component';
import {BgImageBlockComponent} from './components/partials/block-types/bg-image-block/bg-image-block.component';
import {TextImageBlockComponent} from './components/partials/block-types/text-image-block/text-image-block.component';
import {VideoBlockComponent} from './components/partials/block-types/video-block/video-block.component';
import {AllStoriesComponent} from './components/pages/all-stories/all-stories.component';
import {LinkBlockComponent} from './components/partials/block-types/link-block/link-block.component';
import {HoverOpacityDirective} from './_directives/hover-opacity.directive';
import {HoverRotateDirective} from './_directives/hover-rotate.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule
} from '@angular/material';
import { VacancyComponent } from './components/pages/vacancy/vacancy.component';
import { VacancyDescComponent } from './components/pages/vacancy/vacancy-desc/vacancy-desc.component';
import { Hover3dRotateDirective } from './_directives/hover-3d-rotate.directive';
import { FooterComponent } from './components/partials/footer/footer.component';
import { WorkDescComponent } from './components/pages/work/work-desc/work-desc.component';
import { StoriesDescComponent } from './components/pages/stories/stories-desc/stories-desc.component';
import { WorkDetailComponent } from './components/pages/work/work-detail/work-detail.component';
import { StoryDetailComponent } from './components/pages/stories/story-detail/story-detail.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
        SidebarComponent,
        WorkComponent,
        StoriesComponent,
        CareersComponent,
        ImageBlockComponent,
        AllBlocksComponent,
        BlogBlockComponent,
        BgImageBlockComponent,
        TextImageBlockComponent,
        VideoBlockComponent,
        AllStoriesComponent,
        LinkBlockComponent,
        HoverOpacityDirective,
        HoverRotateDirective,
        VacancyComponent,
        VacancyDescComponent,
        Hover3dRotateDirective,
        FooterComponent,
        WorkDescComponent,
        StoriesDescComponent,
        WorkDetailComponent,
        StoryDetailComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
