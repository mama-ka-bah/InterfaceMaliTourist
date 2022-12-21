import { TestBed } from '@angular/core/testing';

import { AnneeService } from './annee.service';

describe('AnneeService', () => {
  let service: AnneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
