import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_ITEMS } from '../../constants/menu-items.constant';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseAuthService } from '../../../features/authentication/services/supabase-auth/supabase-auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  readonly menuItems = MENU_ITEMS;

  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly router: Router,
  ) {}

  async logout() {
    await this.supabaseAuthService.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
