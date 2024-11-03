import { LoginComponent } from './login.component';
import { SupabaseAuthService } from '../services/supabase-auth/supabase-auth.service';
import { AlertToastService } from '../../../core/services/alert-toast/alert-toast.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: SupabaseAuthService;
  let alertService: AlertToastService;
  let router: Router;

  beforeEach(() => {
    service = {
      login: jest.fn(),
    } as never;
    alertService = {
      open: jest.fn(),
    } as never;
    router = {
      navigateByUrl: jest.fn(),
    } as never;

    component = new LoginComponent(service, alertService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
