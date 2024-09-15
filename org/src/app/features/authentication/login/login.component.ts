import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SupabaseAuthService } from '../services/supabase-auth/supabase-auth.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertToastService } from '../../../core/services/alert-toast/alert-toast.service';
import { LoginForm, loginForm } from './login-form.constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup<LoginForm> = loginForm;
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
      !this.form.controls.email.value ||
      !this.form.controls.password.value
    ) {
      this.form.reset();
      this.form.controls.email.markAsDirty();
      this.form.controls.password.markAsDirty();
      return;
    }

    this.loading = true;
    const { error } = await this.supabaseAuthService.login(
      this.form.controls.email.value,
      this.form.controls.password.value,
    );
    this.loading = false;
    if (error) {
      return this.alertToastService.open(
        'error',
        error.code === 'invalid_credentials'
          ? 'Credenciales incorrectas.'
          : 'Ocurrió un error durante la autenticación.',
      );
    }
    this.form.reset();
    await this.router.navigateByUrl('/dashboard/data-upload');
    return this.alertToastService.open('success', 'Inicio de sesión exitoso');
  }
}
