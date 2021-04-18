import { TestBed } from '@angular/core/testing';

import { ParentChildGuard } from './parent-child.guard';

describe('ParentChildGuard', () => {
  let guard: ParentChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ParentChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
