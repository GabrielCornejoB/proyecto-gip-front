import { SideBarComponent } from './side-bar.component';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';
import { Router } from '@angular/router';

describe('SideBarComponent', () => {
  let component: SideBarComponent;

  const supabaseAuthService = {
    logout: jest.fn(),
  } as never as SupabaseAuthService;

  const router = {
    navigateByUrl: jest.fn(),
  } as never as Router;

  beforeEach(() => {
    component = new SideBarComponent(supabaseAuthService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.menuItems).toBeTruthy();
  });

  describe('logout()', () => {
    it('should logout from supabase and redirect to the login page', async () => {
      await component.logout();

      expect(supabaseAuthService.logout).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });
  });
});
