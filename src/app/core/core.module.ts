import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {throwIfAlreadyLoaded} from './guard/module-import.guard';
import {AuthFacade} from './facade/auth.facade';
import { AuthState } from "./state/auth.state";
import {TokenInterceptor} from './interceptor/token.interceptor';
import { GroupFacade } from './facade/group.facade';
import { GroupState } from "./state/group.state";
import { CommFacade } from './facade/comm.facade';
import { CommState } from "./state/comm.state";
import { ProFacade } from './facade/pro.facade';
import { ProState } from "./state/pro.state";

@NgModule({
    declarations: [
  ],
    imports: [
      HttpClientModule
    ],
    providers: [
        AuthFacade,
        AuthState,
        GroupFacade,
        GroupState,
        CommFacade,
        CommState,
        ProFacade,
        ProState,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}