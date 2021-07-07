import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * 그룹 리스트 조회
   * @returns 
   */
  searchGroupList(): Observable<any> {
    const PATH = '/group/list';
    const url = this.BASE_URL + PATH;

    return this.http.get(url);
  }

  /**
   * 그룹 정보 저장
   * @param data 
   * @returns 
   */
  saveGroup(data): Observable<any> {
    const PATH = '/group/save';
    const URL = this.BASE_URL + PATH;
    return this.http.post(URL, data);
  }
}
