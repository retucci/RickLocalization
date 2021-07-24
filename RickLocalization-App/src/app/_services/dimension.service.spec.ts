/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DimensionService } from './dimension.service';

describe('Service: Dimension', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DimensionService]
    });
  });

  it('should ...', inject([DimensionService], (service: DimensionService) => {
    expect(service).toBeTruthy();
  }));
});
