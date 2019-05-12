import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { WorkExampleComponent } from './work-example/work-example.component';
import { WorkCarsComponent } from './work-cars/work-cars.component';
import { PricesComponent } from './prices/prices.component';
import { ContentComponent } from './content/content.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { WorkCarsListComponent } from './work-cars-list/work-cars-list.component';
import {YaCoreModule, YamapngModule} from 'yamapng';
import { InfoComponent } from './info/info.component';
import { WorkCarsInfoComponent } from './work-cars-info/work-cars-info.component';
import {HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    WorkExampleComponent,
    WorkCarsComponent,
    PricesComponent,
    ContentComponent,
    RecomendationComponent,
    WorkCarsListComponent,
    InfoComponent,
    WorkCarsInfoComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    YamapngModule,
    YaCoreModule.forRoot({
      apiKey: 'AN4hb1wBAAAA-916LQMDxl_Wu3RNORghjJpGItp-kb-xEckAAAAAAAAAAAByWqrIbtDDM6tK7DisYM6poVnhmQ=='
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
