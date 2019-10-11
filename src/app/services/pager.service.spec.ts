import { TestBed, inject } from '@angular/core/testing';

import { PagerService } from './pager.service';
import {} from 'jasmine';
describe('PagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagerService]
    });
  });

  it('should be created', inject([PagerService], (service: PagerService) => {
    expect(service).toBeTruthy();
  }));
});
