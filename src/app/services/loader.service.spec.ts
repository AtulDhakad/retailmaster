import { TestBed, inject } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import {} from 'jasmine';
describe('LoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
  });

  it('should be created', inject([LoaderService], (service: LoaderService) => {
    expect(service).toBeTruthy();
  }));
});
