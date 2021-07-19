import {RouterModule, Routes} from '@angular/router';
import {GroupComponent} from './page/group/group.component';
import { ProComponent } from './page/pro/pro.component';
//import {RegisterComponent} from './pages/register/register.component';
import {NgModule} from '@angular/core';
//import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
//import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
//import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/group', pathMatch: 'full'},
  { path: '', children: [
       { path: 'group', component: GroupComponent, data: {title: 'SwingSaver Admin'} },
       { path: 'pro-mng', component: ProComponent, data: {title: 'SwingSaver Market Pro Management'} },
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
export class HomeRoutingModule {

}
