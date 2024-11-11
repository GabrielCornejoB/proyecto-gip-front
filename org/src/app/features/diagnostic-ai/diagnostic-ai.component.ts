import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import {
  aiRequestForm,
  appointmentStatuses,
  commitmentTypes,
  coreSubjects,
  genders,
  identificationTypes,
  procedureTypes,
  userTypes,
} from './ai-request-form.model';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AiRequest } from './ai-request.model';
import { AlertToastService } from '../../core/services/alert-toast/alert-toast.service';
import { SupabaseAuthService } from '../authentication/services/supabase-auth/supabase-auth.service';
import { BehaviorSubject } from 'rxjs';
import { Prediction } from './prediction.model';

@Component({
  selector: 'app-diagnostic-ai',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './diagnostic-ai.component.html',
})
export class DiagnosticAiComponent implements OnInit {
  form = aiRequestForm;
  isLoading: boolean = false;
  predictions$ = new BehaviorSubject<Prediction[]>([]);
  protected readonly identificationTypes = identificationTypes;
  protected readonly genders = genders;
  protected readonly coreSubjects = coreSubjects;
  protected readonly procedureTypes = procedureTypes;
  protected readonly commitmentTypes = commitmentTypes;
  protected readonly appointmentStatuses = appointmentStatuses;
  protected readonly userTypes = userTypes;

  constructor(
    private readonly http: HttpClient,
    private readonly alertService: AlertToastService,
    private readonly service: SupabaseAuthService,
  ) {}

  async ngOnInit() {
    this.predictions$.next((await this.service.getPredictions()).data as any);
  }

  sendPrediction() {
    this.isLoading = true;
    const request = new AiRequest(
      this.form.controls.identification_type.value,
      this.form.controls.consultation_date.value,
      this.form.controls.gender.value,
      this.form.controls.birth_date.value,
      this.form.controls.subject.value,
      this.form.controls.commitment_type.value,
      this.form.controls.appointment_status.value,
      this.form.controls.procedure_type.value,
      this.form.controls.user_type.value,
    );

    this.http
      .post<{
        message: string;
      }>(`${environment.API_URL}/model`, request)
      .subscribe({
        next: async (res) => {
          await this.service.insertPrediction(request, res.message);

          this.alertService.open(
            'success',
            `El modelo predice que el usuario pertenece a la familia: ${res.message}`,
          );

          this.predictions$.next(
            (await this.service.getPredictions()).data as any,
          );

          this.isLoading = false;
        },
        error: (err) => {
          this.alertService.open('error', err.message);
          this.isLoading = false;
        },
      });
  }
}
