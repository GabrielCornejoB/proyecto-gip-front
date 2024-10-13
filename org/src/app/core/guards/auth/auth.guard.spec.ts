import { AuthGuard } from './auth.guard';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const supabaseAuthService = {
    getUserSession: jest.fn().mockResolvedValue({ data: { session: true } }),
  } as never as SupabaseAuthService;

  const router = {
    navigateByUrl: jest.fn(),
  } as never as Router;

  beforeEach(() => {
    guard = new AuthGuard(supabaseAuthService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    it(
      'GIVEN there is a valid session ' +
        'WHEN the user navigates to a protected route ' +
        'THEN it should allow the user to continue',
      async () => {
        const result = await guard.canActivate();

        expect(result).toBeTruthy();
      },
    );

    it(
      'GIVEN there is not a valid session ' +
        'WHEN the user navigates to a protected route ' +
        'THEN it should redirect the user to the login screen',
      async () => {
        jest
          .spyOn(supabaseAuthService, 'getUserSession')
          .mockResolvedValueOnce({ data: { session: null } } as never);

        const result = await guard.canActivate();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
        expect(result).toBeFalsy();
      },
    );
  });
});
