import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnChanges {

  @Input() videos: { date: string; videos: { id: string; timestampValue: string; title: string; url: string; latitude: string; longitude: string; }[]; }[] = [];

  map: L.Map | undefined;
  videoMarkers: {id: string, marker: L.Marker}[] = [];
  activeMarkerId: string | null = null;
  constructor() { }

  ngOnInit(): void {
    delete(L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/marker-icon-2x.png',
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png'
    });

    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    //this.addVideoMarkers();
    L.marker([51.5, -0.09])
      .addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

      this.addVideoMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    if (changes['videos'] && this.map) {
      this.addVideoMarkers();
    }
  }

  addVideoMarkers(): void {
    if (!this.map) return;

    // Remove existing markers
    this.videoMarkers.forEach(vm => this.map!.removeLayer(vm.marker));
    this.videoMarkers = [];

    // Add new markers
    console.log('Adding video markers:', this.videos);
    this.videos.forEach(group => {
      group.videos.forEach(video => {
        const marker = L.marker([parseFloat(video.latitude), parseFloat(video.longitude)])
          .addTo(this.map!)
          .bindPopup(`${video.title}<br>Latitude : ${video.latitude}<br>Longitude : ${video.longitude}`);

        marker.on('mouseover', function () {
        marker.openPopup();
      });
      marker.on('mouseout', function () {
        marker.closePopup();
      });

        this.videoMarkers.push({ id: video.id, marker });
      });
    });
  }


}

