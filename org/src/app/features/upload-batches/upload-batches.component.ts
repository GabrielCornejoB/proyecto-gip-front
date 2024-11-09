import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseAuthService } from '../authentication/services/supabase-auth/supabase-auth.service';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from '../../core/components/header/header.component';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';

@Component({
  selector: 'app-upload-batches',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './upload-batches.component.html',
})
export class UploadBatchesComponent implements OnInit {
  batches$ = new BehaviorSubject<any>([]);
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly alertService: AlertToastService,
  ) {}

  async ngOnInit() {
    this.batches$.next(
      (await this.supabaseAuthService.getAllUniqueBatches()).data,
    );

    const { data } = await this.supabaseAuthService.getUserSession();

    const dataSession = data.session;

    if (dataSession) {
      const { data: roleData } = await this.supabaseAuthService.getUserRole(
        data.session.user.id,
      );
      if (roleData && roleData[0]?.role && roleData[0].role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  async deleteBatch(batchId: string) {
    this.isLoading = true;
    const { error } =
      await this.supabaseAuthService.deleteRegistersOfBatch(batchId);
    if (!error) {
      this.batches$.next(
        this.batches$.value.filter((b: any) => b.batch_id !== batchId),
      );
      this.alertService.open(
        'success',
        'Se eliminaron los datos cargados en la fecha: ' + batchId,
      );
    }
    this.isLoading = false;
  }
}
