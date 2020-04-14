import { TestBed } from '@angular/core/testing';

import { FruitServiceService } from './fruit-service.service';

describe('FruitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FruitServiceService = TestBed.get(FruitServiceService);
    expect(service).toBeTruthy();
  });
});
