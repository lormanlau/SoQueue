import { TestBed, inject } from '@angular/core/testing';

import { LoginregService } from './loginreg.service';

describe('LoginregService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginregService]
    });
  });

  it('should be created', inject([LoginregService], (service: LoginregService) => {
    expect(service).toBeTruthy();
  }));
});
