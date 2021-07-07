import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginContextInterface, TokenInterface} from '../../data/schema/auth';
import {Observable} from 'rxjs';
import {Logger} from '../logger.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly BASE_URL = environment.baseUrl;
  private readonly log = new Logger(this.constructor.name);

  constructor(private http: HttpClient) { }

  login(loginContextInterface: LoginContextInterface): Observable<any> {
    const PATH = '/auth/login';
    const url = this.BASE_URL + PATH;

    console.log(url);
    console.log(loginContextInterface);

    return this.http.post(url, loginContextInterface);
  }

  logout(): Observable<any> {
    const PATH = '/auth/signout';
    const url = this.BASE_URL + PATH;
    return this.http.get(url);
  }
}
