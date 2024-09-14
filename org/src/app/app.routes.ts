import { Route } from '@angular/router';
import { DashboardWrapperComponent } from './core/components/dashboard-wrapper/dashboard-wrapper.component';
import { AuthWrapperComponent } from './core/components/auth-wrapper/auth-wrapper.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PublicGuard } from './core/guards/public/public.guard';

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
    ],
  },
];
