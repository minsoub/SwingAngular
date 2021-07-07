import {Injectable} from '@angular/core';
import {TokenInterface} from '../../data/schema/auth';
import {Observable, of} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Logger} from '../logger.service';
import ObjectUtils from '../../shared/utils/object-utils'

@Injectable()
export class AuthState {
    private readonly log = new Logger(this.constructor.name);
    private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  
    /**
     * Token을 스토리지에 저장한다.
     * @param tokens 
     */
    setTokens(tokens: TokenInterface): void {
      localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    }
  
    /**
     * 스토리지에 저장된 Token을 리턴한다.
     * @returns 
     */
    getTokens(): TokenInterface | null {
      return {
        accessToken: localStorage.getItem(this.ACCESS_TOKEN),
      }
    }
  
    deleteTokens(): void {
      localStorage.removeItem(this.ACCESS_TOKEN);
    }
  
    isLogined(): Observable<boolean> {
        const tokens = this.getTokens();
        const tokenHelper = new JwtHelperService();
        console.log("token => " + tokens.accessToken);
        if (typeof tokens.accessToken !== 'undefined') {
          if (!tokenHelper.isTokenExpired(tokens.accessToken)) {
              return of(true);
          } else {
              return of(false);
          }   
        }else {
          return of(false);
        }   
    }

    logout(): Observable<boolean> {
        localStorage.removeItem(this.ACCESS_TOKEN);
        return of(false);
    }
}
