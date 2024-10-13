import { PublicGuard } from './public.guard';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';
import { Router } from '@angular/router';

describe('PublicGuard', () => {
  let guard: PublicGuard;

  const supabaseAuthService = {
    getUserSession: jest.fn().mockResolvedValue({ data: { session: null } }),
  } as never as SupabaseAuthService;

  const router = {
    navigateByUrl: jest.fn(),
  } as never as Router;

  beforeEach(() => {
    guard = new PublicGuard(supabaseAuthService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    it(
      'GIVEN there is not a session ' +
        'WHEN the user navigates to a public route ' +
        'THEN it should allow the user to continue in that screen',
      async () => {
        const result = await guard.canActivate();

        expect(result).toBeTruthy();
      },
    );

    it(
      'GIVEN there is a valid session ' +
        'WHEN the user navigates to a public route ' +
        'THEN it should redirect the user to the main dashboard screen',
      async () => {
        jest
          .spyOn(supabaseAuthService, 'getUserSession')
          .mockResolvedValueOnce({ data: { session: true } } as never);

        const result = await guard.canActivate();

        expect(router.navigateByUrl).toHaveBeenCalledWith(
          '/dashboard/data-upload',
        );
        expect(result).toBeFalsy();
      },
    );
  });
});
