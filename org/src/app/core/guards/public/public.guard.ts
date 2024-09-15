import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const { data } = await this.supabaseAuthService.getUserSession();

    if (data.session !== null) {
      await this.router.navigateByUrl('/dashboard/data-upload');
      return false;
    }

    return true;
  }
}
