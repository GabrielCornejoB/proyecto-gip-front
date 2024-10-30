import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const { data } = await this.supabaseAuthService.getUserSession();

    if (data.session === null) {
      await this.router.navigateByUrl('/auth/login');
      return false;
    }

    const accessToken = data.session?.access_token;

    if (accessToken) {
      const { data: roleData } = await this.supabaseAuthService.getUserRole(
        data.session.user.id,
      );
      if (!roleData || !roleData[0]?.role || roleData[0].role === 'pending') {
        await this.router.navigateByUrl('/missing-permissions');
        await this.supabaseAuthService.logout();
        return false;
      }
    }

    return true;
  }
}
