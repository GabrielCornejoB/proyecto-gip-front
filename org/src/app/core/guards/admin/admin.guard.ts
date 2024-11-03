import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../services/alert-toast/alert-toast.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly router: Router,
    private readonly alertService: AlertToastService,
  ) {}

  async canActivate(): Promise<boolean> {
    const { data } = await this.supabaseAuthService.getUserSession();

    const dataSession = data.session;

    if (dataSession) {
      const { data: roleData } = await this.supabaseAuthService.getUserRole(
        data.session.user.id,
      );
      if (!roleData || !roleData[0]?.role || roleData[0].role !== 'admin') {
        this.alertService.open(
          'error',
          'El usuario no tiene permisos para acceder a esta vista.',
        );
        await this.router.navigateByUrl('/dashboard/data-upload');
        return false;
      }
    }

    return true;
  }
}
