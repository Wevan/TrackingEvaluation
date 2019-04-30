import { TestBed } from '@angular/core/testing';

import { DetailResourceService } from './detail-resource.service';

describe('DetailResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailResourceService = TestBed.get(DetailResourceService);
    expect(service).toBeTruthy();
  });
});
