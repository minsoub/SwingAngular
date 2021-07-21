import { Injectable } from '@angular/core';
import {CommService} from '../service/comm.service';
import { FileService} from '../service/file.service';
import {CommState} from '../state/comm.state';
import {Observable} from 'rxjs';
import {UserInterface} from '../../data/schema/user';
import {FileInterface} from '../../data/schema/file';

@Injectable({
  providedIn: 'root'
})
export class CommFacade {
  constructor(private commService: CommService,
              private fileService: FileService,
              private commState: CommState) { }

  getAllUser(): void {
    this.commService.getAllUserList().subscribe((list) => {
      this.commState.setUserList(list);
    });
  }

  getUserList(): Observable<UserInterface[]> {
    return this.commState.getUserList();
  }    

  uploadFile(file): Observable<any> {
    return this.fileService.fileUpload(file);
  }
  
  deleteFile(file_name): Observable<any> {
    return this.fileService.fileDelete(file_name);
  }
}
