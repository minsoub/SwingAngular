
import {Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Logger} from '../logger.service';
import {environment} from '../../../environments/environment';
import {AuthFacade} from '../facade/auth.facade';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public authFacade: AuthFacade,
        //private oidcSecurityService: OidcSecurityService,
        private router: Router) { }

    private readonly log = new Logger(this.constructor.name);

    private static addXClient(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
          setHeaders: {
            'x-api-key': environment.xApiKey,
          }
        });
    }
    
    private static addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        });
    }    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.log.debug("intercept call");
        this.log.debug(request.url);
        request = request.clone({
          withCredentials: true
        });
        
        if (!request.url.endsWith('/connect/userinfo') && !request.url.startsWith('https://api.openweathermap.org') && !request.url.startsWith('https://icheck-mobile-app.s3.ap-northeast-2.amazonaws.com')) {
          request = TokenInterceptor.addXClient(request);
          const tokens = this.authFacade.getTokens();
          if (!!tokens.accessToken) {
            request = TokenInterceptor.addToken(request, tokens.accessToken);
          }
          return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.endsWith('/auth') && !request.url.endsWith('/auth/sso')) {
              this.log.debug('토큰 만료');
              this.logoutByAccessToken();
            } else {
              return throwError(error);
            }
          }));
        }
      }
    
      private logoutByAccessToken(): void {
        this.authFacade.deleteTokens();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
}
