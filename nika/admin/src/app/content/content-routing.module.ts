import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from "./content.component";
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {ChangePostComponent} from "./posts/change-post/change-post.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";
import {SlidersListComponent} from "./slider/sliders-list/sliders-list.component";
import {ChangeSliderComponent} from "./slider/change-slider/change-slider.component";
import {AddSliderComponent} from "./slider/add-slider/add-slider.component";
import {MediasListComponent} from "./media/medias-list/medias-list.component";
import {ChangeMediaComponent} from "./media/change-media/change-media.component";
import {AddMediaComponent} from "./media/add-media/add-media.component";
import {PortfolioListComponent} from "./portfolio/portfolio-list/portfolio-list.component";
import {AddPortfolioComponent} from "./portfolio/add-portfolio/add-portfolio.component";
import {ChangePortfolioComponent} from "./portfolio/change-portfolio/change-portfolio.component";
import {SettingsListComponent} from "./settings/settings-list/settings-list.component";
import {MenuListComponent} from "./menu/menu-list/menu-list.component";
import {MenuAddComponent} from "./menu/menu-add/menu-add.component";
import {MenuChangeComponent} from "./menu/menu-change/menu-change.component";
import {VacancyListComponent} from "./vacancy/vacancy-list/vacancy-list.component";
import {AddVacancyComponent} from "./vacancy/add-vacancy/add-vacancy.component";
import {ChangeVacancyComponent} from "./vacancy/change-vacancy/change-vacancy.component";
import {BlockListComponent} from "./block/block-list/block-list.component";
import {AddBlockComponent} from "./block/add-block/add-block.component";
import {ChangeBlockComponent} from "./block/change-block/change-block.component";
import {BlockPreviewComponent} from "./block/block-preview/block-preview.component";
import {GroupListComponent} from "./group/group-list/group-list.component";
import {AddGroupComponent} from "./group/add-group/add-group.component";
import {ChangeGroupComponent} from "./group/change-group/change-group.component";

const routes: Routes = [
  {path: '', component: ContentComponent, children: [
      {path: 'post', component: PostsListComponent},
      {path: 'changePost', component: ChangePostComponent},
      {path: 'addPost', component: AddPostComponent},
      {path: 'slider', component: SlidersListComponent},
      {path: 'changeSlider', component: ChangeSliderComponent},
      {path: 'addSlider', component: AddSliderComponent},
      {path: 'media', component: MediasListComponent},
      {path: 'changeMedia', component: ChangeMediaComponent},
      {path: 'addMedia', component: AddMediaComponent},
      {path: 'portfolio', component: PortfolioListComponent},
      {path: 'changePortfolio', component: ChangePortfolioComponent},
      {path: 'addPortfolio', component: AddPortfolioComponent},
      {path: 'menu', component: MenuListComponent},
      {path: 'addMenu', component: MenuAddComponent},
      {path: 'changeMenu', component: MenuChangeComponent},
      {path: 'vacancy', component: VacancyListComponent},
      {path: 'addVacancy', component: AddVacancyComponent},
      {path: 'changeVacancy', component: ChangeVacancyComponent},
      {path: 'block', component: BlockListComponent},
      {path: 'blockPreview', component: BlockPreviewComponent},
      {path: 'addBlock', component: AddBlockComponent},
      {path: 'changeBlock', component: ChangeBlockComponent},
      {path: 'settings', component: SettingsListComponent},
      {path: 'group', component: GroupListComponent},
      {path: 'addGroup', component: AddGroupComponent},
      {path: 'changeGroup', component: ChangeGroupComponent},
      {path: '**', redirectTo: 'posts', pathMatch: 'full'}
    ]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule { }
