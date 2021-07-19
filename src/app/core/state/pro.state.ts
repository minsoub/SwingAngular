import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProInterface, ProListInterface} from '../../data/schema/pro';

@Injectable()
export class ProState {
    private proList: BehaviorSubject<ProListInterface> = new BehaviorSubject<ProListInterface>(null);

    constructor() {}

    getProList(): Observable<ProListInterface> {
        return this.proList.asObservable();
    }

    setProList(lists: ProListInterface): void {
        if (lists) {
            this.proList.next(lists);
        }
    }
    addProList(list: ProListInterface): void {
        this.proList.next(list);
    }
    resetProList(): void {
        this.proList.next(null);
    }
    
}
