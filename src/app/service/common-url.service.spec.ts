import { TestBed } from '@angular/core/testing';

import { CommonUrlService } from './common-url.service';

describe('CommonUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonUrlService = TestBed.get(CommonUrlService);
    expect(service).toBeTruthy();
  });
});
