import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';

import {SharedModule} from '../../shared/shared.module';
import {AuthRoutingModule} from './auth.routing';
import {AuthComponent} from './auth.component';


@NgModule({
  declarations: [
      LoginComponent, 
      AuthComponent,
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
