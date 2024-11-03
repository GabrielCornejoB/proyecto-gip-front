import { Route } from '@angular/router';
import { DashboardWrapperComponent } from './core/components/dashboard-wrapper/dashboard-wrapper.component';
import { AuthWrapperComponent } from './core/components/auth-wrapper/auth-wrapper.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PublicGuard } from './core/guards/public/public.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: 'auth',
    component: AuthWrapperComponent,
    canActivate: [PublicGuard],
    loadChildren: () => [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/authentication/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/authentication/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardWrapperComponent,
    canActivate: [AuthGuard],
    loadChildren: () => [
      {
        path: 'data-upload',
        loadComponent: () =>
          import('./features/data-upload/data-upload.component').then(
            (c) => c.DataUploadComponent,
          ),
      },
      {
        path: 'diagnostic-ai',
        loadComponent: () =>
          import('./features/diagnostic-ai/diagnostic-ai.component').then(
            (c) => c.DiagnosticAiComponent,
          ),
      },
      {
        path: 'grant-access',
        loadComponent: () =>
          import('./features/grant-access/grant-access.component').then(
            (c) => c.GrantAccessComponent,
          ),
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'missing-permissions',
    loadComponent: () =>
      import(
        './features/missing-permissions/missing-permissions.component'
      ).then((c) => c.MissingPermissionsComponent),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
