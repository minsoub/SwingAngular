import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ProInterface, ProListInterface} from '../../data/schema/pro';
import {ProService} from '../service/pro.service';
import {ProState} from '../state/pro.state';
import {AlertService} from '../../shared/service/alert.service';
import {Logger} from '../logger.service';
import ObjectUtils from '../../shared/utils/object-utils';

@Injectable()
export class ProFacade {
    private readonly log = new  Logger('ProFacade');

    constructor(private proService: ProService,
        private proState: ProState,
        private alertService: AlertService
        ) { }

    searchProList(): void {
        this.proService.searchProList().subscribe((res => {
            if (res?.list) {
                console.log(res);
                this.proState.setProList(res);
            }else {
                this.proState.resetProList();
            }
        }));
    }

    /**
     * 마켓 프로 정보를 저장한다.
     * 
     * @param data 
     * @returns 
     */
    savePro(data): Observable<any> {
        return this.proService.savePro(data);
    }

    resetProList(): void {
        this.proState.resetProList();
    }
    getProList(): Observable<ProListInterface> {
        return this.proState.getProList();
    }
}
