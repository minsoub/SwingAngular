import {Injectable} from '@angular/core';
import {GroupListInterface, GroupContextInterface, GroupAdminListInterface, GroupAdminInterface} from '../../data/schema/group';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class GroupState {
    //private groupInfo: BehaviorSubject<GroupContextInterface[]> = new BehaviorSubject<GroupContextInterface[]>([]);
    //private groupAdminInfo: BehaviorSubject<GroupAdminInterface[]> = new BehaviorSubject<GroupAdminInterface[]>([]);
    private groupListInfo: BehaviorSubject<GroupListInterface> = new BehaviorSubject<GroupListInterface>(null);  // .create();  //  new BehaviorSubject<GroupListInterface>;

    constructor() {}

    getGroupList(): Observable<GroupListInterface> {
        //console.log(this.groupListInfo);
        return this.groupListInfo.asObservable();
    }

    setGroupList(lists: GroupListInterface): void {
        if (lists) {
            console.log(lists);
            this.groupListInfo.next(null);
            this.groupListInfo.next(lists);
            //this.groupInfo.next(lists.grouplist);
            //this.groupAdminInfo.next(lists.groupadminlist);
        }
    }
    addGroupList(lists: GroupListInterface): void {
        this.groupListInfo.next(lists);
        //this.groupInfo.next(this.groupInfo.getValue().concat(lists.grouplist));
        //this.groupAdminInfo.next(this.groupAdminInfo.getValue().concat(lists.groupadminlist));
    }

    // getGroupAdminList(): Observable<GroupAdminInterface[]> {
    //     return this.groupAdminInfo.asObservable();
    // }
    // addGroupAdminList(lists: GroupAdminListInterface): void {
    //     this.groupAdminInfo.next(this.groupAdminInfo.getValue().concat(lists.groupadminlist));
    // }

    resetGroupList(): void {
        this.groupListInfo.next(null);
        //this.groupInfo.next([]);
        //this.groupAdminInfo.next([]);
    }
}
