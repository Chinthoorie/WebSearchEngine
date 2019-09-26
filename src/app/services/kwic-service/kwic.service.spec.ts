import { TestBed } from '@angular/core/testing';

import { KwicService } from './kwic.service';

describe('KwicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KwicService = TestBed.get(KwicService);
    expect(service).toBeTruthy();
  });
});
