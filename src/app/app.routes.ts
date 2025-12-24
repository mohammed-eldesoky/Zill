import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  /* ======================= AUTH LAYOUT ======================== */

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
      },
      {
        path: 'verify',
        loadComponent: () =>
          import('./core/auth/verify/verify.component').then(
            (c) => c.VerifyComponent
          ),
      },
    ],
  },

  //==============   MAIN LAYOUT================

  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/messages/messages.component').then(
            (c) => c.MessagesComponent
          ),
      },
      {
        path: 'messages/:id',
        loadComponent: () =>
          import('./features/specific/specific.component').then(
            (c) => c.SpecificComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./features/user/user.component').then((c) => c.UserComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settigns.component').then(
            (c) => c.SettignsComponent
          ),
        children: [
          {
            path: 'update-password',
            loadComponent: () =>
              import(
                './features/settings/components/update-pass/update-pass.component'
              ).then((c) => c.UpdatePassComponent),
          },
          {
            path: 'language',
            loadComponent: () =>
              import(
                './features/settings/components/language/language.component'
              ).then((c) => c.LanguageComponent),
          },
        ],
      },
      {
        path: 'send/:nickName',
        loadComponent: () =>
          import('./features/send-messge/send-messge.component').then(
            (c) => c.SendMessageComponent
          ),
      },
    ],
  },

  /* ======================= FALLBACK ======================== */

  {
    path: '**',
    redirectTo: '',
  },
];
