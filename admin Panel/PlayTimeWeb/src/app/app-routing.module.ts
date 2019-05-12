import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {ContentComponent} from "./content/content.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'', redirectTo: 'content', pathMatch: 'full'},
  {path:'content', canActivate: [AuthGuard], component: ContentComponent},
  {path:'login', component: LoginComponent},
  // {path: '**', redirectTo: 'content'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
