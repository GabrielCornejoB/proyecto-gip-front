import { Route } from '@angular/router';
import { DashboardWrapperComponent } from './core/components/dashboard-wrapper/dashboard-wrapper.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: 'dashboard',
    component: DashboardWrapperComponent,
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
