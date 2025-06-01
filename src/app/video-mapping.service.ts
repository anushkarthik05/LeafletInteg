import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoMappingService {

  allAccordionsVideoList: {
    date: string;
    videos: {
      id: string;
      timestampValue: string;
      title: string;
      url: string;
      latitude: string;
      longitude: string;
    }[];
  }[] = [];

  constructor() {}
  private activeVideoIdSubject = new BehaviorSubject<string | null>(null);
  activeVideoId$ = this.activeVideoIdSubject.asObservable();
  setActiveVideoId(videoId: string | null): void {
    this.activeVideoIdSubject.next(videoId);
  }
  getActiveVideoId(): string | null {
    return this.activeVideoIdSubject.getValue();
  }

  fetchRecentVideos(): void {
  this.getVideoMetaData().subscribe(
    (response) => {
      this.allAccordionsVideoList = Object.entries(response).map(([date, videos]: [string, any[]]) => ({
        date,
        videos: videos.map((video) => ({
          id: "video-" + (video.timeStampInMS),
          timestampValue: video.timeStampInMS,
          title: video.filename,
          url: video.url,
          latitude: video.latitude,
          longitude: video.longitude
        }))
      }));
    },
    (error) => {
      console.error('Error fetching video metadata:', error);
    }
  );
}


  getVideoMetaData() {
  // Simulate HTTP call with RxJS 'of'
  return of({
    "28-05-2025": [
      {
        filename: "filevideo1.mp4",
        url: "https://86b851a0-7e8e-4788-84b7-fa0895d860b2.mdnplay.dev/shared-assets/videos/flower.mp4",
        timeStampInMS: "1748428540210",
        latitude: "48.88281",
        longitude: "9.085913"
      },
      {
        filename: "filevideo2.mp4",
        url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        timeStampInMS: "1748415910210",
        latitude: "18.88281",
        longitude: "4.085913"
      }
    ],
    "29-05-2025": [
      {
        filename: "filevideo3.mp4",
        url: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        timeStampInMS: "1791915919120",
        latitude: "51.88281",
        longitude: "13.085913"
      }
    ]
    });
  }

  get AllAccordionsVideoListReference() {
    return this.allAccordionsVideoList;
  }
}
