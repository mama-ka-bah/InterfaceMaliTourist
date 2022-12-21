import { TestBed } from '@angular/core/testing';

import { AccueilService } from './accueil.service';

describe('AccueilService', () => {
  let service: AccueilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccueilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
