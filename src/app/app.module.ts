import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoMappingService } from './video-mapping.service';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    CardModule,
  ],
  exports:[
    AccordionModule,
    CardModule
  ],
  providers: [VideoMappingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
