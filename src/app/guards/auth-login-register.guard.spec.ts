import { TestBed } from '@angular/core/testing';

import { AuthLoginRegisterGuard } from './auth-login-register.guard';

describe('AuthLoginRegisterGuard', () => {
  let guard: AuthLoginRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoginRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
