import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
//import {RegisterComponent} from './pages/register/register.component';
import {NgModule} from '@angular/core';
//import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
//import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
//import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: '', children: [
      { path: 'login', component: LoginComponent, data: {title: 'SwingSaver Admin'} },
 //     { path: 'register', component: RegisterComponent, data: {title: 'icheck'} },
 //     { path: 'forget-password', component: ForgetPasswordComponent, data: {title: 'icheck'} },
 //     { path: 'privacy-policy', component: PrivacyPolicyComponent, data: {title: 'icheck'} },
 //     { path: 'reset-password', component: ResetPasswordComponent, data: {title: 'icheck'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
