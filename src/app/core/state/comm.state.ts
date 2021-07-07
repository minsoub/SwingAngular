import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserInterface} from '../../data/schema/user';


@Injectable()
export class CommState {
    private userList: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);

    constructor() {
    }

    setUserList(userList: UserInterface[]): void {
        this.userList.next(userList || []);
    }
    getUserList(): Observable<UserInterface[]> {
        return this.userList.asObservable();
    }    
}
