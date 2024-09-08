import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'data-upload',
    loadComponent: () =>
      import('./features/data-upload/data-upload.component').then(
        (c) => c.DataUploadComponent,
      ),
  },
];
