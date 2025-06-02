import { Component, Input,Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnChanges {

  @Input() videos: { date: string; videos: { id: string; timestampValue: string; title: string; url: string; latitude: string; longitude: string; }[]; }[] = [];
  @Input() activeVideoId: string | null = null; // <-- for highlighting marker
  @Output() markerClicked = new EventEmitter<string>(); // <-- emit video id

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

    this.map = L.map('map').setView([51.505, -0.09], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    //this.addVideoMarkers();
      this.addVideoMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videos'] && this.map) {
      this.addVideoMarkers();
    }
    if (changes['activeVideoId'] && this.map) {
      this.highlightActiveMarker();
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

      // Emit event on click
        marker.on('click', () => {
          this.markerClicked.emit(video.id);
        });

        this.videoMarkers.push({ id: video.id, marker });
      });
    });

    this.highlightActiveMarker();

    if (this.videoMarkers.length > 0 && !this.activeVideoId) {
      this.centerMapOnMarker(this.videoMarkers[0].marker);
    }
  }


  highlightActiveMarker() {
    console.log('Highlighting active marker:', this.activeVideoId);
    // Remove highlight from all markers (reset to default icon)
    this.videoMarkers.forEach(vm => {
      vm.marker.setIcon(new L.Icon.Default());
    });

    // Highlight the active marker
    if (this.activeVideoId) {
      const active = this.videoMarkers.find(vm => vm.id === this.activeVideoId);
      if (active) {
        this.activeMarkerId = active.id; // Set the active marker ID
        //active.marker.closePopup();
        active.marker.openPopup();
        this.centerMapOnMarker(active.marker);
      }
    }
  }

  public centerMapOnMarker(activeMarker: L.Marker) {
    if (activeMarker instanceof L.Marker && this.map) {
      this.map.setView(activeMarker.getLatLng(), this.map.getZoom(), { animate: true });
    }
  }
}

