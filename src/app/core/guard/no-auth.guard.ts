import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthFacade} from '../facade/auth.facade';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Logger} from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  private readonly log = new Logger(this.constructor.name);

  constructor(private authFacade: AuthFacade, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authFacade.isLoggedIn().pipe(
        map(e => {
          if (e) {
            if (next.queryParams.auth === '1') {
              this.router.navigate(['/', 'home']);
            }
          }
          return true;
        }), catchError(err => {
          this.log.error(err);
          return of(true);
        })
    );
  }
  
}
