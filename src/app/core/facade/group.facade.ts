import {Injectable} from '@angular/core';
import {GroupContextInterface} from '../../data/schema/group';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {GroupService} from '../service/group.service';
import {GroupState} from '../state/group.state';
import {AlertService} from '../../shared/service/alert.service';
import {Logger} from '../logger.service';
import ObjectUtils from '../../shared/utils/object-utils';

@Injectable()
export class GroupFacade {

    
    private readonly log = new  Logger('AuthFacade');


    constructor(private groupService: GroupService,
                private groupState: GroupState,
                private alertService: AlertService
                ) { }

    searchGroupList(): void {
        this.groupService.searchGroupList().subscribe((res => {
            if (res?.list) {
                this.groupState.setGroupList(res);
            }else {
                this.groupState.resetGroupList();
            }
        }));
    }

    getGroupList(): Observable<GroupContextInterface[]> {
        return this.groupState.getGroupList();
    }

    /**
     * 그룹 정보 저장
     * @param data 
     * @returns 
     */
    saveGroup(data): Observable<any> {
        return this.groupService.saveGroup(data);
    }

}
