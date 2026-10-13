import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./birthday-content').then((module) => module.BirthdayContent),
  },
  {
    path: 'surprise',
    loadComponent: () => import('./surprise/surprise').then((module) => module.SurpriseComponent),
  },
  { path: '**', redirectTo: '' },
];
