import { RegisterComponent } from './register.component';
import { SupabaseAuthService } from '../services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../../core/services/alert-toast/alert-toast.service';
import { Router } from '@angular/router';
import { registerForm } from './register-form.constant';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let service: SupabaseAuthService;
  let alertService: AlertToastService;
  let router: Router;

  beforeEach(() => {
    service = {
      register: jest.fn(),
      initializeUserRole: jest.fn(),
    } as unknown as SupabaseAuthService;
    alertService = {
      open: jest.fn(),
    } as unknown as AlertToastService;
    router = {
      navigateByUrl: jest.fn(),
    } as unknown as Router;

    component = new RegisterComponent(service, alertService, router);
    component.form = registerForm; // Assign the register form
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form and mark controls as dirty if there are validation errors', () => {
    component.form.controls.email.setErrors({ required: true });
    component.form.controls.password.setErrors({ required: true });
    component.form.controls.confirmPassword.setErrors({ required: true });
    component.form.controls.name.setErrors({ required: true });
    component.form.controls.justification.setErrors({ required: true });

    const resetSpy = jest.spyOn(component.form, 'reset');
    const markAsDirtySpies = [
      jest.spyOn(component.form.controls.email, 'markAsDirty'),
      jest.spyOn(component.form.controls.password, 'markAsDirty'),
      jest.spyOn(component.form.controls.confirmPassword, 'markAsDirty'),
      jest.spyOn(component.form.controls.name, 'markAsDirty'),
      jest.spyOn(component.form.controls.justification, 'markAsDirty'),
    ];

    component.handleFormSubmit();

    expect(resetSpy).toHaveBeenCalled();
    markAsDirtySpies.forEach((spy) => expect(spy).toHaveBeenCalled());
  });

  it('should call SupabaseAuthService.register and handle successful registration', async () => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('password');
    component.form.controls.confirmPassword.setValue('password');
    component.form.controls.name.setValue('Test User');
    component.form.controls.justification.setValue('Testingdddd');

    service.register = jest
      .fn()
      .mockResolvedValue({ error: null, data: { user: { id: 'user123' } } });
    service.initializeUserRole = jest.fn().mockResolvedValue(null);
    jest.spyOn(component.form, 'reset');
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.register).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
    expect(service.initializeUserRole).toHaveBeenCalledWith(
      'user123',
      'Test User',
      'Testingdddd',
      'test@example.com',
    );
    expect(component.loading).toBe(false);
    expect(component.form.reset).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard/data-upload');
    expect(alertService.open).toHaveBeenCalledWith(
      'success',
      'Registro exitoso. Debe esperar que un administrador le otorgue acceso al aplicativo',
    );
  });

  it('should display error toast if registration fails', async () => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('password');
    component.form.controls.confirmPassword.setValue('password');
    component.form.controls.name.setValue('Test User');
    component.form.controls.justification.setValue('Testingddd');

    service.register = jest
      .fn()
      .mockResolvedValue({ error: { code: 'error' }, data: null });
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.register).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
    expect(component.loading).toBe(false);
    expect(alertService.open).toHaveBeenCalledWith(
      'error',
      'Ocurrió un error durante el registro',
    );
  });

  it('should display error toast if registration succeeds but no user data is returned', async () => {
    component.form.controls.email.setValue('test@example.com');
    component.form.controls.password.setValue('password');
    component.form.controls.confirmPassword.setValue('password');
    component.form.controls.name.setValue('Test User');
    component.form.controls.justification.setValue('Testingddd');

    service.register = jest
      .fn()
      .mockResolvedValue({ error: null, data: { user: null } });
    jest.spyOn(alertService, 'open');

    await component.handleFormSubmit();

    expect(service.register).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
    expect(component.loading).toBe(false);
    expect(alertService.open).toHaveBeenCalledWith(
      'error',
      'Ocurrió un error durante el registro',
    );
  });
});
