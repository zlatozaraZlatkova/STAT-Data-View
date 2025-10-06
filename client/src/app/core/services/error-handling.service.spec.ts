import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ErrorService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorHandlingService]
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
