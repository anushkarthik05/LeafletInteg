import { Component, OnInit } from '@angular/core';
import { VideoMappingService } from '../video-mapping.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  activeIndex: number|null = null;

  allAccordions:{
    date:string;
    videos:{
      id:string;
      timestampValue:string;
      title:string;
      url:string;
      latitude:string;
      longitude:string;
    }[]
  }[]=[];
  constructor(private videoMappingService:VideoMappingService) { }

  ngOnInit(): void {
    this.getRecentVideos();
  }

  getRecentVideos(){
    this.videoMappingService.fetchRecentVideos();
    this.allAccordions = this.videoMappingService.AllAccordionsVideoListReference;
    const firstAccordionWithVideos = this.allAccordions.findIndex(acc => acc.videos.length > 0);
    this.activeIndex = firstAccordionWithVideos !== -1 ? firstAccordionWithVideos : null;
  }

  changeLatLng(){
    console.log("Changing lat lng");

    this.allAccordions[0].videos[0].latitude = "51.505";
    this.allAccordions[0].videos[0].longitude = "-0.09";
  }
}
