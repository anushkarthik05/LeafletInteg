import { TestBed } from '@angular/core/testing';

import { VideoMappingService } from './video-mapping.service';

describe('VideoMappingService', () => {
  let service: VideoMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
