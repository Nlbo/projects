import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GetCategoryComponent} from "./get-category/get-category.component";
import {GetSubCategoryComponent} from "./get-sub-category/get-sub-category.component";
import {GetImageComponent} from "./get-image/get-image.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";
import {EditSubCategoryComponent} from "./edit-sub-category/edit-sub-category.component";
import {EditImageComponent} from "./edit-image/edit-image.component";
import {AddImageComponent} from "./add-image/add-image.component";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {AddSubCategoryComponent} from "./add-sub-category/add-sub-category.component";
import {ContentComponent} from "./content.component";
import {AuthGuard} from "../auth.guard";
import {GetLanguagesComponent} from "./get-languages/get-languages.component";
import {AddLanguagesComponent} from "./add-languages/add-languages.component";

const routes: Routes = [
  {path: 'content', component: ContentComponent, children: [
      {path: 'getCategory', canActivate:[AuthGuard], component: GetCategoryComponent},
      {path: 'getSubcategory', canActivate:[AuthGuard], component: GetSubCategoryComponent},
      {path: 'getImages', canActivate:[AuthGuard], component: GetImageComponent},
      {path: 'getLanguages', canActivate:[AuthGuard], component: GetLanguagesComponent},
      {path: 'changeCategory', canActivate:[AuthGuard], component: EditCategoryComponent},
      {path: 'changeSubCategory',  canActivate:[AuthGuard], component: EditSubCategoryComponent},
      {path: 'changeImage',  canActivate:[AuthGuard], component: EditImageComponent},
      {path: 'addImage',  canActivate:[AuthGuard], component: AddImageComponent},
      {path: 'addCategory', canActivate:[AuthGuard], component: AddCategoryComponent},
      {path: 'addSubCategory', canActivate:[AuthGuard], component: AddSubCategoryComponent},
      {path: 'addLanguage', canActivate:[AuthGuard], component: AddLanguagesComponent},
      {path: '**', redirectTo: 'getCategory'},
      {path: '', redirectTo: 'getCategory' , pathMatch: 'full'},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
