import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../../data/schema/user';
import {Logger} from '../logger.service';

@Injectable({
    providedIn: 'root'
})
export class CommService {
    private readonly log = new Logger(this.constructor.name);

    private readonly BASE_URL = environment.baseUrl;
  
    constructor(private http: HttpClient) { }   
    
    getAllUserList(): Observable<UserInterface[]> {
        const PATH = '/group/userlist';
        const url = this.BASE_URL + PATH;
        return this.http.get<UserInterface[]>(url);        
    }
}
