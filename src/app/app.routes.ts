import { Routes } from '@angular/router';

export const routes: Routes = [

  // {
  //   path: '',
  //   // loadChildren: () => import('./shared/pages/tabs/tabs.routes').then(m => m.routes)
  //   loadComponent: () => import('./auth/ui/pages/login/login.page').then(m => m.LoginPage)
  //
  // },

  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },


  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/ui/pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/ui/pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'login-page',
    loadComponent: () => import('./auth/ui/pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'register-page',
    loadComponent: () => import('./auth/ui/pages/register-page/register-page.page').then( m => m.RegisterPagePage)
  },

  {
    path: 'tabs',
    loadComponent: () => import('./shared/pages/tabs/tabs.page').then( m => m.TabsPage)
  },






];
