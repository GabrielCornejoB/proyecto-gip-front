import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { SupabaseAuthService } from '../authentication/services/supabase-auth/supabase-auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-grant-access',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './grant-access.component.html',
})
export class GrantAccessComponent implements OnInit {
  pendingUsers = new BehaviorSubject<any[]>([]);
  isLoading$ = new BehaviorSubject(false);

  constructor(private readonly service: SupabaseAuthService) {}

  async ngOnInit() {
    const { data } = await this.service.getAllPendingUsers();

    if (data) {
      this.pendingUsers.next(data);
    }
  }

  async grantAccessToUser(userId: string) {
    this.isLoading$.next(true);
    const { error } = await this.service.grantUserAccess(userId);
    if (!error) {
      this.pendingUsers.next(
        this.pendingUsers.value.filter((u) => u.user_id !== userId),
      );
    }
    this.isLoading$.next(false);
  }
}
