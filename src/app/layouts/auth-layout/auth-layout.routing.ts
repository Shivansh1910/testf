import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { SecLoginComponent } from 'src/app/pages/sec-login/sec-login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'sec/login',          component: SecLoginComponent },
    // { path: 'register',       component: RegisterComponent }
];
