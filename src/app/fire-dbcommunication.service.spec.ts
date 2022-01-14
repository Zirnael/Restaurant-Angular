import { TestBed } from '@angular/core/testing';

import { FireDBcommunicationService } from './fire-dbcommunication.service';

describe('FireDBcommunicationService', () => {
  let service: FireDBcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireDBcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
