import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkComponent} from './components/pages/work/work.component';
import {StoriesComponent} from './components/pages/stories/stories.component';
import {AllBlocksComponent} from './components/partials/all-blocks/all-blocks.component';
import {WorkDetailComponent} from './components/pages/work/work-detail/work-detail.component';
import {StoryDetailComponent} from './components/pages/stories/story-detail/story-detail.component';

const child: Routes = [];
const routes: Routes = [
    {path: '', component: AllBlocksComponent, pathMatch: 'full'},
    {path: 'home', component: AllBlocksComponent},
    {path: 'contact', component: AllBlocksComponent},
    {path: 'about', component: AllBlocksComponent},
    {path: 'works', component: WorkComponent},
    {path: 'work/:id', component: WorkDetailComponent},
    {path: 'all-stories', component: StoriesComponent},
    {path: 'stories', component: StoriesComponent},
    {path: 'story/:id', component: StoryDetailComponent},
    {path: 'careers', component: AllBlocksComponent},

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
