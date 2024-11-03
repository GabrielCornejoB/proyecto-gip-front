import { AdminGuard } from './admin.guard';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../services/alert-toast/alert-toast.service';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let service: SupabaseAuthService;
  let alertService: AlertToastService;
  let router: Router;

  beforeEach(() => {
    service = {
      getUserSession: jest.fn().mockResolvedValue({
        data: { session: { user: { id: '123' } } },
      }),
      getUserRole: jest.fn().mockResolvedValue({
        data: [{ role: 'admin' }],
      }),
    } as never;
    alertService = {
      open: jest.fn(),
    } as never;
    router = {
      navigateByUrl: jest.fn(),
    } as never;

    guard = new AdminGuard(service, alertService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should continue if user has admin role', async () => {
    const result = await guard.canActivate();

    expect(result).toBe(true);
  });

  it('should redirect if user has not admin role', async () => {
    service = {
      getUserSession: jest.fn().mockResolvedValue({
        data: { session: { user: { id: '123' } } },
      }),
      getUserRole: jest.fn().mockResolvedValue({
        data: [{ role: 'user' }],
      }),
    } as never;
    guard = new AdminGuard(service, alertService, router);

    const result = await guard.canActivate();

    expect(result).toBe(false);
    expect(alertService.open).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
});
