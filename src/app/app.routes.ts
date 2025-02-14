import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register-gym', loadComponent: () => import('./pages/register-gym/register-gym.page').then(m => m.RegisterGymPage) },
  { path: 'register-account', loadComponent: () => import('./pages/register-account/register-account.page').then(m => m.RegisterAccountPage) }
];
