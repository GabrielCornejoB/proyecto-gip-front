import { LoginComponent } from './login.component';
import { SupabaseAuthService } from '../services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../../core/services/alert-toast/alert-toast.service';
import { Router } from '@angular/router';
import { loginForm } from './login-form.constant';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: SupabaseAuthService;
  let alertService: AlertToastService;
  let router: Router;

  beforeEach(() => {
    service = {
      login: jest.fn(),
    } as unknown as SupabaseAuthService;
    alertService = {
      open: jest.fn(),
    } as unknown as AlertToastService;
    router = {
      navigateByUrl: jest.fn(),
    } as unknown as Router;

    component = new LoginComponent(service, alertService, router);
    component.form = loginForm; // Assign the login form
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form and mark controls as dirty if email or password is invalid', () => {
    jest.spyOn(component.form, 'reset');
    jest.spyOn(component.form.controls.email, 'markAsDirty');
    jest.spyOn(component.form.controls.password, 'markAsDirty');
    component.form.controls.email.setErrors({ required: true });
    component.form.controls.password.setErrors({ required: true });

    component.handleFormSubmit();

    expect(component.form.reset).toHaveBeenCalled();
    expect(component.form.controls.email.markAsDirty).toHaveBeenCalled();
    expect(component.form.controls.password.markAsDirty).toHaveBeenCalled();
  });

  it('should call SupabaseAuthService.login and handle successful login', async () => {
    jest.spyOn(component.form, 'reset');

    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('password');
    service.login = jest.fn().mockResolvedValue({ error: null });
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(component.loading).toBe(false);
    expect(component.form.reset).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/data-upload');
    expect(alertService.open).toHaveBeenCalledWith(
      'success',
      'Inicio de sesión exitoso',
    );
  });

  it('should display error toast if login fails due to invalid credentials', async () => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('wrongpassword');
    service.login = jest
      .fn()
      .mockResolvedValue({ error: { code: 'invalid_credentials' } });
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.login).toHaveBeenCalledWith(
      'test@example.com',
      'wrongpassword',
    );
    expect(component.loading).toBe(false);
    expect(alertService.open).toHaveBeenCalledWith(
      'error',
      'Credenciales incorrectas.',
    );
  });

  it('should display general error toast if login fails with another error', async () => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('password');
    service.login = jest
      .fn()
      .mockResolvedValue({ error: { code: 'other_error' } });
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(component.loading).toBe(false);
    expect(alertService.open).toHaveBeenCalledWith(
      'error',
      'Ocurrió un error durante la autenticación.',
    );
  });
});
