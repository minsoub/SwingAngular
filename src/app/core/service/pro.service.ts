import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProService {
    private readonly BASE_URL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    /**
     * Market Pro 리스트 조회
     * @returns 
     */
    searchProList(): Observable<any> {
        const PATH = '/pro/prolist';
        const url = this.BASE_URL + PATH;

        return this.http.get(url);
    }
}
