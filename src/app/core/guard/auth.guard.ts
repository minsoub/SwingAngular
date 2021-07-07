import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Logger} from '../logger.service';
import {AuthFacade} from '../facade/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly log = new Logger(this.constructor.name);

  constructor(private authFacade: AuthFacade, private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authFacade.isLoggedIn().pipe(
        map(e => {
          if (e) {
            return true;
          }
        }), catchError((err => {
          this.router.navigate(['/', 'login'], { queryParams: { returnUrl: state.url} });
          return of(false);
        }))
    );
  }
  
}
