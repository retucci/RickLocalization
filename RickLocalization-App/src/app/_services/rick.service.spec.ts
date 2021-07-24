/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RickService } from './rick.service';

describe('Service: Rick', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RickService]
    });
  });

  it('should ...', inject([RickService], (service: RickService) => {
    expect(service).toBeTruthy();
  }));
});
