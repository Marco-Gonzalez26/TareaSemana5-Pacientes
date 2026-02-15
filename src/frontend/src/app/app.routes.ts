import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pacientes',
    pathMatch: 'full',
  },
  {
    path: 'pacientes',
    loadComponent: () =>
      import('./pages/patients/patients-list/patients-list.component').then(
        (m) => m.PatientListComponent,
      ),
  },
  {
    path: 'pacientes/nuevo',
    loadComponent: () =>
      import('./pages/patients/patients-form/patients-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: 'pacientes/editar/:id',
    loadComponent: () =>
      import('./pages/patients/patients-form/patients-form.component').then(
        (m) => m.PatientFormComponent,
      ),
  },
  {
    path: 'pacientes/:id/historias',
    loadComponent: () =>
      import('./pages/clinic-histories/histories-list/histories-list.component').then(
        (m) => m.HistoriesListComponent,
      ),
  },
  {
    path: 'pacientes/:id/historias/nueva',
    loadComponent: () =>
      import('./pages/history-form/history-form/history-form.component').then(
        (m) => m.HistoryFormComponent,
      ),
  },

  {
    path: '**',
    redirectTo: 'pacientes',
  },
];
