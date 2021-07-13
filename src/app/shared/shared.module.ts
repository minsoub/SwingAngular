import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './component/loader/loader.component';
import {MaterialModule} from './material.module';

import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptor} from './interceptor/loader.interceptor';
import { AlertComponent } from './component/alert/alert.component';
import { NavComponent } from './component/nav/nav.component';
import { InfiniteScrollComponent } from './component/infinite-scroll/infinite-scroll.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
//import { InfiniteScrollComponent } from './component/infinite-scroll/infinite-scroll.component';
//import { BannerAppInduceComponent } from './component/banner-app-induce/banner-app-induce.component';
//import { ConfirmComponent } from './component/confirm/confirm.component';
//import { ErrorComponent } from './component/error/error.component';

@NgModule({
  declarations: [LoaderComponent,  AlertComponent, NavComponent, InfiniteScrollComponent, ConfirmComponent,   ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    LoaderComponent,
    MaterialModule,
    NavComponent,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
