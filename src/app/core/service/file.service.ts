import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private readonly BASE_URL = environment.baseUrl;

    constructor(private http: HttpClient) {}

    /**
     * Market Pro 리스트 조회
     * @returns 
     */
    fileUpload(file): Observable<any> {
        const PATH = '/file/upload';
        const url = this.BASE_URL + PATH;

        const formData = new FormData();
        formData.append("file", file);
    
        return this.http.post(url, formData);
    }

    fileDelete(file_name): Observable<any> {
        const PATH = '/file/delete';
        const url = this.BASE_URL + PATH;
        const data = { fileName: file_name };
        return this.http.post(url, data);
    }
}
