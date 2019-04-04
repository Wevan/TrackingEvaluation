import { TestBed } from '@angular/core/testing';

import { HttpInterService } from './http-inter.service';

describe('HttpInterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterService = TestBed.get(HttpInterService);
    expect(service).toBeTruthy();
  });
});
