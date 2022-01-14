import { TestBed } from '@angular/core/testing';

import { ChosenDishesService } from './chosen-dishes.service';

describe('ChosenDishesService', () => {
  let service: ChosenDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
