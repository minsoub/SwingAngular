import {Injectable} from '@angular/core';
import {LoginContextInterface, TokenInterface} from '../../data/schema/auth';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {AuthState} from '../state/auth.state';
import {AlertService} from '../../shared/service/alert.service';
import {Logger} from '../logger.service';
import ObjectUtils from '../../shared/utils/object-utils';

@Injectable()
export class AuthFacade {

    private readonly log = new  Logger('AuthFacade');


    constructor(private authService: AuthService,
                private authState: AuthState,
                private alertService: AlertService
                ) { }
    
    
    doLogin(loginContext: LoginContextInterface): Observable<any> {
        return this.authService.login(loginContext)
            .pipe(                
                map(res => {
                    console.log(res);  
                    if (res.status !== 0) {
                        this.alertService.openAlert(res.message);
                        return res;
                    }else {
                        console.log(res.response.data);
                        let token : TokenInterface = { accessToken: res.response.data }
                        console.log(token.accessToken);
                        this.setTokens(token);
                        return true;
                    }
                }),
                catchError(err => {
                    console.log(err);
                    return of(false);
                })
            );
    }
    
    deleteTokens(): void {
        this.authState.deleteTokens();
    }
            
    logout(): Observable<any> {
        return this.authService.logout();
    }
            
    getTokens(): TokenInterface {
        return this.authState.getTokens();
    }
            
    setTokens(tokens: TokenInterface): void {
        this.authState.setTokens(tokens);
    }
            
    isLoggedIn(): Observable<boolean> {
        return this.authState.isLogined();
    }
}
