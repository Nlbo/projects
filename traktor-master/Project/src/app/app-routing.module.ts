import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from './content/content.component';
import {WorkCarsListComponent} from './work-cars-list/work-cars-list.component';
import {WorkCarsInfoComponent} from './work-cars-info/work-cars-info.component';

const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'carsList', component: WorkCarsListComponent},
  {path: 'carInfo', component: WorkCarsInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
