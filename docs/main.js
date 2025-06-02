(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/anushkarthik/Desktop/AngularMapCommunication/LeafletInteg/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DLND":
/*!******************************************************!*\
  !*** ./src/app/leaflet-map/leaflet-map.component.ts ***!
  \******************************************************/
/*! exports provided: LeafletMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeafletMapComponent", function() { return LeafletMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "4R65");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);



class LeafletMapComponent {
    constructor() {
        this.videos = [];
        this.activeVideoId = null; // <-- for highlighting marker
        this.markerClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); // <-- emit video id
        this.videoMarkers = [];
        this.activeMarkerId = null;
    }
    ngOnInit() {
        delete leaflet__WEBPACK_IMPORTED_MODULE_1__["Icon"].Default.prototype._getIconUrl;
        leaflet__WEBPACK_IMPORTED_MODULE_1__["Icon"].Default.mergeOptions({
            iconRetinaUrl: 'assets/images/marker-icon-2x.png',
            iconUrl: 'assets/images/marker-icon.png',
            shadowUrl: 'assets/images/marker-shadow.png'
        });
        this.map = leaflet__WEBPACK_IMPORTED_MODULE_1__["map"]('map').setView([51.505, -0.09], 5);
        leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"]('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        //this.addVideoMarkers();
        this.addVideoMarkers();
    }
    ngOnChanges(changes) {
        if (changes['videos'] && this.map) {
            this.addVideoMarkers();
        }
        if (changes['activeVideoId'] && this.map) {
            this.highlightActiveMarker();
        }
    }
    addVideoMarkers() {
        if (!this.map)
            return;
        // Remove existing markers
        this.videoMarkers.forEach(vm => this.map.removeLayer(vm.marker));
        this.videoMarkers = [];
        // Add new markers
        console.log('Adding video markers:', this.videos);
        this.videos.forEach(group => {
            group.videos.forEach(video => {
                const marker = leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"]([parseFloat(video.latitude), parseFloat(video.longitude)])
                    .addTo(this.map)
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
            vm.marker.setIcon(new leaflet__WEBPACK_IMPORTED_MODULE_1__["Icon"].Default());
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
    centerMapOnMarker(activeMarker) {
        if (activeMarker instanceof leaflet__WEBPACK_IMPORTED_MODULE_1__["Marker"] && this.map) {
            this.map.setView(activeMarker.getLatLng(), this.map.getZoom(), { animate: true });
        }
    }
}
LeafletMapComponent.ɵfac = function LeafletMapComponent_Factory(t) { return new (t || LeafletMapComponent)(); };
LeafletMapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LeafletMapComponent, selectors: [["app-leaflet-map"]], inputs: { videos: "videos", activeVideoId: "activeVideoId" }, outputs: { markerClicked: "markerClicked" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 0, consts: [["id", "map", 2, "height", "400px"]], template: function LeafletMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } }, styles: [".huechange[_ngcontent-%COMP%] {\n  filter: hue-rotate(120deg) brightness(1.2);\n  transition: filter 0.3s;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGVhZmxldC1tYXAvbGVhZmxldC1tYXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQ0FBQTtFQUNBLHVCQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9sZWFmbGV0LW1hcC9sZWFmbGV0LW1hcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5odWVjaGFuZ2Uge1xuICBmaWx0ZXI6IGh1ZS1yb3RhdGUoMTIwZGVnKSBicmlnaHRuZXNzKDEuMik7XG4gIHRyYW5zaXRpb246IGZpbHRlciAwLjNzO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LeafletMapComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-leaflet-map',
                templateUrl: './leaflet-map.component.html',
                styleUrls: ['./leaflet-map.component.scss']
            }]
    }], function () { return []; }, { videos: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], activeVideoId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], markerClicked: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _video_list_video_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./video-list/video-list.component */ "WNIZ");



class AppComponent {
    constructor() {
        this.title = 'LeafletInteg';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-video-list");
    } }, directives: [_video_list_video_list_component__WEBPACK_IMPORTED_MODULE_1__["VideoListComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "WNIZ":
/*!****************************************************!*\
  !*** ./src/app/video-list/video-list.component.ts ***!
  \****************************************************/
/*! exports provided: VideoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoListComponent", function() { return VideoListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _video_mapping_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../video-mapping.service */ "oOIR");
/* harmony import */ var _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../leaflet-map/leaflet-map.component */ "DLND");
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/accordion */ "7LiV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/card */ "QIUk");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ "7zfz");








function VideoListComponent_p_accordionTab_6_div_1_div_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const video_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", video_r4.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](video_r4.timestamp);
} }
function VideoListComponent_p_accordionTab_6_div_1_div_2_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "video", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("play", function VideoListComponent_p_accordionTab_6_div_1_div_2_ng_template_3_Template_video_play_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const video_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r8.onVideoPlay(video_r4.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const video_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", video_r4.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("id", video_r4.id);
} }
function VideoListComponent_p_accordionTab_6_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, VideoListComponent_p_accordionTab_6_div_1_div_2_ng_template_2_Template, 4, 2, "ng-template", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, VideoListComponent_p_accordionTab_6_div_1_div_2_ng_template_3_Template, 1, 2, "ng-template", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function VideoListComponent_p_accordionTab_6_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, VideoListComponent_p_accordionTab_6_div_1_div_2_Template, 4, 0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const accordion_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", accordion_r1.videos);
} }
function VideoListComponent_p_accordionTab_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p-accordionTab", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, VideoListComponent_p_accordionTab_6_div_1_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const accordion_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("header", accordion_r1.videos.length > 0 ? accordion_r1.date : accordion_r1.date + " (No videos)")("disabled", accordion_r1.videos.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", accordion_r1.videos.length > 0);
} }
class VideoListComponent {
    constructor(videoMappingService) {
        this.videoMappingService = videoMappingService;
        this.activeIndex = null;
        this.activeVideoId = null;
        this.allAccordions = [];
    }
    ngOnInit() {
        this.getRecentVideos();
    }
    getRecentVideos() {
        this.videoMappingService.fetchRecentVideos();
        this.allAccordions = this.videoMappingService.AllAccordionsVideoListReference;
        const firstAccordionWithVideos = this.allAccordions.findIndex(acc => acc.videos.length > 0);
        this.activeIndex = firstAccordionWithVideos !== -1 ? firstAccordionWithVideos : null;
    }
    changeLatLng() {
        console.log("Changing lat lng");
        this.allAccordions[0].videos[0].latitude = "51.505";
        this.allAccordions[0].videos[0].longitude = "-0.09";
    }
    scrollToVideo(videoId) {
        const accordionIndex = this.allAccordions.findIndex(acc => acc.videos.some(video => video.id === videoId));
        if (accordionIndex !== -1) {
            this.activeIndex = accordionIndex; // Open the correct accordion tab
            // Pause all videos not in the active accordion
            this.allAccordions.forEach((accordion, idx) => {
                if (idx !== accordionIndex) {
                    accordion.videos.forEach(video => {
                        const vidEl = document.getElementById(video.id);
                        if (vidEl && !vidEl.paused) {
                            vidEl.pause();
                        }
                    });
                }
            });
        }
        // Scroll to the video element after the accordion is open
        setTimeout(() => {
            const el = document.getElementById(videoId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight');
                setTimeout(() => el.classList.remove('highlight'), 1500);
            }
            this.activeVideoId = videoId; // highlight marker
        }, 200); // Delay to allow accordion animation
    }
    onVideoPlay(videoId) {
        document.querySelectorAll('video').forEach((vid) => {
            if (vid.id !== videoId) {
                vid.pause();
            }
        });
        if (this.activeVideoId === videoId) {
            this.activeVideoId = null;
            setTimeout(() => {
                this.activeVideoId = videoId;
            }, 0);
        }
        else {
            this.activeVideoId = videoId;
        }
    }
    onAccordionChange(newIndex) {
        this.activeIndex = newIndex;
        // Pause all videos not in the active accordion
        this.allAccordions.forEach((accordion, idx) => {
            if (idx !== newIndex) {
                accordion.videos.forEach(video => {
                    const vidEl = document.getElementById(video.id);
                    if (vidEl && !vidEl.paused) {
                        vidEl.pause();
                    }
                });
            }
        });
    }
}
VideoListComponent.ɵfac = function VideoListComponent_Factory(t) { return new (t || VideoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_video_mapping_service__WEBPACK_IMPORTED_MODULE_1__["VideoMappingService"])); };
VideoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VideoListComponent, selectors: [["app-video-list"]], decls: 7, vars: 4, consts: [[3, "videos", "activeVideoId", "markerClicked"], [3, "click"], [3, "activeIndex", "activeIndexChange"], [3, "header", "disabled", 4, "ngFor", "ngForOf"], [3, "header", "disabled"], ["class", "video-container", 4, "ngIf"], [1, "video-container"], [1, "row"], ["class", "col-md-4 p-2", 4, "ngFor", "ngForOf"], [1, "col-md-4", "p-2"], ["pTemplate", "title"], ["pTemplate", "content"], [1, "video-title"], [1, "video-timestamp"], ["width", "100%", "controls", "", 3, "src", "id", "play"]], template: function VideoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "video-list works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-leaflet-map", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("markerClicked", function VideoListComponent_Template_app_leaflet_map_markerClicked_2_listener($event) { return ctx.scrollToVideo($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VideoListComponent_Template_button_click_3_listener() { return ctx.changeLatLng(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Change Lat/Lng");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p-accordion", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeIndexChange", function VideoListComponent_Template_p_accordion_activeIndexChange_5_listener($event) { return ctx.onAccordionChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, VideoListComponent_p_accordionTab_6_Template, 2, 3, "p-accordionTab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("videos", ctx.allAccordions)("activeVideoId", ctx.activeVideoId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("activeIndex", ctx.activeIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.allAccordions);
    } }, directives: [_leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_2__["LeafletMapComponent"], primeng_accordion__WEBPACK_IMPORTED_MODULE_3__["Accordion"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], primeng_accordion__WEBPACK_IMPORTED_MODULE_3__["AccordionTab"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], primeng_card__WEBPACK_IMPORTED_MODULE_5__["Card"], primeng_api__WEBPACK_IMPORTED_MODULE_6__["PrimeTemplate"]], styles: [".video-container[_ngcontent-%COMP%] {\n  max-height: 600px;\n  overflow-y: auto;\n  padding: 10px;\n  overflow-x: hidden;\n  box-sizing: border-box;\n}\n\n.video-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n}\n\n.video-timestamp[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: normal;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\nvideo[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 16/9;\n  border-radius: 0px;\n  object-fit: cover;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n\nvideo[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);\n}\n\n[_nghost-%COMP%]     .p-card {\n  background: #f8f9fa;\n  border: 1px solid #d1d5db;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding-bottom: 5px;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  border-radius: 0px;\n}\n\n.highlight[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlkZW8tbGlzdC92aWRlby1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esd0NBQUE7RUFDQSxxREFBQTtBQUNKOztBQUVBO0VBQ0ksc0JBQUE7RUFDQSx5Q0FBQTtBQUNKOztBQUVBO0VBQ0ksbUJBQUE7RUFDQSx5QkFBQTtFQUNBLHVFQUFBO0VBQ0EscURBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFQTtFQUNJLHNCQUFBO0VBQ0EseUNBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3ZpZGVvLWxpc3QvdmlkZW8tbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi52aWRlby1jb250YWluZXJ7XG4gICAgbWF4LWhlaWdodDogNjAwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBwYWRkaW5nOjEwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi52aWRlby10aXRsZXtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBwYWRkaW5nOiAwcHg7XG59XG5cbi52aWRlby10aW1lc3RhbXB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxudmlkZW97XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYXNwZWN0LXJhdGlvOiAxNi85O1xuICAgIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG52aWRlbzpob3ZlcntcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLnAtY2FyZHtcbiAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkMWQ1ZGI7XG4gICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSwgMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4wNik7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG4gICAgcGFkZGluZy1ib3R0b206IDVweDtcbn1cblxuLmZvcm0tY29udHJvbHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XG59XG5cbi5oaWdobGlnaHR7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICBib3gtc2hhZG93OiAwIDZweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideoListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-video-list',
                templateUrl: './video-list.component.html',
                styleUrls: ['./video-list.component.scss']
            }]
    }], function () { return [{ type: _video_mapping_service__WEBPACK_IMPORTED_MODULE_1__["VideoMappingService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./leaflet-map/leaflet-map.component */ "DLND");
/* harmony import */ var _video_list_video_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./video-list/video-list.component */ "WNIZ");
/* harmony import */ var _video_mapping_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./video-mapping.service */ "oOIR");
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/accordion */ "7LiV");
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/card */ "QIUk");











class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_video_mapping_service__WEBPACK_IMPORTED_MODULE_7__["VideoMappingService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
            primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"],
        ], primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
        primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_5__["LeafletMapComponent"],
        _video_list_video_list_component__WEBPACK_IMPORTED_MODULE_6__["VideoListComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
        primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"]], exports: [primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
        primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_5__["LeafletMapComponent"],
                    _video_list_video_list_component__WEBPACK_IMPORTED_MODULE_6__["VideoListComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
                    primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"],
                ],
                exports: [
                    primeng_accordion__WEBPACK_IMPORTED_MODULE_8__["AccordionModule"],
                    primeng_card__WEBPACK_IMPORTED_MODULE_9__["CardModule"]
                ],
                providers: [_video_mapping_service__WEBPACK_IMPORTED_MODULE_7__["VideoMappingService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "oOIR":
/*!******************************************!*\
  !*** ./src/app/video-mapping.service.ts ***!
  \******************************************/
/*! exports provided: VideoMappingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoMappingService", function() { return VideoMappingService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");




class VideoMappingService {
    constructor() {
        this.allAccordionsVideoList = [];
        this.activeVideoIdSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.activeVideoId$ = this.activeVideoIdSubject.asObservable();
    }
    setActiveVideoId(videoId) {
        this.activeVideoIdSubject.next(videoId);
    }
    getActiveVideoId() {
        return this.activeVideoIdSubject.getValue();
    }
    fetchRecentVideos() {
        this.getVideoMetaData().subscribe((response) => {
            this.allAccordionsVideoList = Object.entries(response).map(([date, videos]) => ({
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
        }, (error) => {
            console.error('Error fetching video metadata:', error);
        });
    }
    getVideoMetaData() {
        // Simulate HTTP call with RxJS 'of'
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({
            "28-05-2025": [
                {
                    filename: "filevideo1.mp4",
                    url: "https://86b851a0-7e8e-4788-84b7-fa0895d860b2.mdnplay.dev/shared-assets/videos/flower.mp4",
                    timeStampInMS: "1748428540210",
                    latitude: "28.88281",
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
VideoMappingService.ɵfac = function VideoMappingService_Factory(t) { return new (t || VideoMappingService)(); };
VideoMappingService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: VideoMappingService, factory: VideoMappingService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideoMappingService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map