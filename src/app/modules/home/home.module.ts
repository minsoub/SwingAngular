import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//import {LoginComponent} from './pages/login/login.component';

import {SharedModule} from '../../shared/shared.module';
import {HomeRoutingModule} from './home.routing';
import {HomeComponent} from './home.component';
import { GroupComponent } from './page/group/group.component';
import { GroupFormComponent } from './form/group-form/group-form.component';
import { ProComponent } from './page/pro/pro.component';


@NgModule({
  declarations: [
//      LoginComponent, 
//      HomeComponent,
    GroupComponent,
    GroupFormComponent,
    ProComponent,
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }