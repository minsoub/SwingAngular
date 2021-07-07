import {Injectable} from '@angular/core';
import {GroupListInterface, GroupContextInterface} from '../../data/schema/group';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class GroupState {
    private groupInfo: BehaviorSubject<GroupContextInterface[]> = new BehaviorSubject<GroupContextInterface[]>([]);

    constructor() {}

    getGroupList(): Observable<GroupContextInterface[]> {
        return this.groupInfo.asObservable();
    }

    setGroupList(lists: GroupListInterface): void {
        if (lists.list) {
            this.groupInfo.next(lists.list);
        }
    }
    addGroupList(lists: GroupListInterface): void {
        this.groupInfo.next(this.groupInfo.getValue().concat(lists.list));
    }
    resetGroupList(): void {
        this.groupInfo.next([]);
    }
}
