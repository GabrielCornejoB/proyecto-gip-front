import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerForm } from './register-form.constant';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SupabaseAuthService } from '../services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../../core/services/alert-toast/alert-toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form = registerForm;
  loading: boolean = false;

  constructor(
    private readonly supabaseAuthService: SupabaseAuthService,
    private readonly alertToastService: AlertToastService,
    private readonly router: Router,
  ) {}

  async handleFormSubmit() {
    if (
      this.form.controls.email.errors ||
      this.form.controls.password.errors ||
      this.form.controls.confirmPassword.errors ||
      this.form.controls.name.errors ||
      this.form.controls.justification.errors ||
      !this.form.controls.email.value ||
      !this.form.controls.password.value ||
      !this.form.controls.confirmPassword.value ||
      !this.form.controls.name.value ||
      !this.form.controls.justification.value
    ) {
      this.form.reset();
      this.form.controls.email.markAsDirty();
      this.form.controls.password.markAsDirty();
      this.form.controls.confirmPassword.markAsDirty();
      this.form.controls.name.markAsDirty();
      this.form.controls.justification.markAsDirty();
      return;
    }
    this.loading = true;
    const { error, data } = await this.supabaseAuthService.register(
      this.form.controls.email.value,
      this.form.controls.password.value,
    );
    this.loading = false;
    if (error || !data || !data.user?.id) {
      return this.alertToastService.open(
        'error',
        'Ocurrió un error durante el registro',
      );
    }

    await this.supabaseAuthService.initializeUserRole(
      data.user.id,
      this.form.controls.name.value,
      this.form.controls.justification.value,
      this.form.controls.email.value,
    );

    this.form.reset();
    await this.router.navigateByUrl('/dashboard/data-upload');
    this.alertToastService.open(
      'success',
      'Registro exitoso. Debe esperar que un administrador le otorgue acceso al aplicativo',
    );
  }
}

// TODO: Unitarias