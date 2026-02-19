import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/patients/patients-list/patients-list.component').then(
        (m) => m.PatientListComponent,
      ),
  },
  {
    path: 'pacientes/nuevo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/patients/patients-form/patients-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: 'pacientes/editar/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/patients/patients-form/patients-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: 'pacientes/:id/historias',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/clinic-histories/histories-list/histories-list.component').then(
        (m) => m.HistoriesListComponent,
      ),
  },
  {
    path: 'pacientes/:id/historias/nueva',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/history-form/history-form/history-form.component').then(
        (m) => m.HistoryFormComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
