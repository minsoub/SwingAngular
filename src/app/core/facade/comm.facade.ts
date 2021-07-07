import { Injectable } from '@angular/core';
import {CommService} from '../service/comm.service';
import {CommState} from '../state/comm.state';
import {Observable} from 'rxjs';
import {UserInterface} from '../../data/schema/user';

@Injectable({
  providedIn: 'root'
})
export class CommFacade {
  constructor(private commService: CommService,
              private commState: CommState) { }

  getAllUser(): void {
    this.commService.getAllUserList().subscribe((list) => {
      this.commState.setUserList(list);
    });
  }

  getUserList(): Observable<UserInterface[]> {
    return this.commState.getUserList();
  }    
}
