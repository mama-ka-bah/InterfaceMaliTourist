import { TestBed } from '@angular/core/testing';

import { UtilisateursService } from './utilisateurs.service';

describe('UtilisateursService', () => {
  let service: UtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
