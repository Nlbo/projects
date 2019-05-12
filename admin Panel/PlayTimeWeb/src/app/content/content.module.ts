import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddImageComponent } from './add-image/add-image.component';
import { GetImageComponent } from './get-image/get-image.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { GetSubCategoryComponent } from './get-sub-category/get-sub-category.component';
import { GetCategoryComponent } from './get-category/get-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditSubCategoryComponent } from './edit-sub-category/edit-sub-category.component';
import { EditImageComponent } from './edit-image/edit-image.component';
import {ContentRoutingModule} from "./content-routing.module";
import { ContentComponent } from './content.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SortablejsModule} from "angular-sortablejs";
import { GetLanguagesComponent } from './get-languages/get-languages.component';
import { AddLanguagesComponent } from './add-languages/add-languages.component';
import {FormsModule} from "@angular/forms";
import { ChangeSubategoryComponent } from './change-subategory/change-subategory.component';

@NgModule({
  declarations: [AddImageComponent, GetImageComponent, AddCategoryComponent, AddSubCategoryComponent, GetSubCategoryComponent, GetCategoryComponent, EditCategoryComponent, EditSubCategoryComponent, EditImageComponent, ContentComponent, GetLanguagesComponent, AddLanguagesComponent, ChangeSubategoryComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    SortablejsModule.forRoot({ animation: 150 }),
  ]
})
export class ContentModule { }
