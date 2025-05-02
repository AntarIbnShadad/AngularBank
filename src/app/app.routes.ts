import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canLoad: [authGuard(false)],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canLoad: [authGuard(false)],
  },

  {
    path: 'users',
    component: UsersComponent,
    canLoad: [authGuard(true)],
  },

  { path: '**', redirectTo: '' },
];
