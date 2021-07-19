import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AlertService} from '../../../../shared/service/alert.service';
import {ConfirmComponent} from '../../../../shared/component/confirm/confirm.component';

import {ProInterface, ProListInterface} from 'src/app/data/schema/pro';
import { ProFacade } from '../../../../core/facade/pro.facade';
import {Logger} from '../../../../core/logger.service';


@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  private readonly log = new Logger(this.constructor.name);
  dataSource = new MatTableDataSource<ProInterface>([]);
  selection = new SelectionModel<ProInterface>(true, []);
  listCount: number
  
  displayedColumns: string[] = ['email', 'name', 'prolevel', 'lessonprice'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private proFacade: ProFacade,
              private alertService: AlertService) { 
    
    proFacade.getProList().subscribe((lists) => {
      console.log(lists);
      console.log(lists.list);
      //this.dataSource.data = lists.list;
    });
  }

  ngOnInit(): void {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.searchPro();
  }

  /**
   * Market Pro search
   */
  searchPro() {
    this.proFacade.searchProList();
  }

  /**
   * Market Pro 신규 등록 및 수정 팝업 호출
   * @param mode 
   * @param selectedGroup 
   */
  openProPopup(mode, selectedGroup?): void {

  }
  /**
   * Market Pro 정보 상세 보기 클릭
   * @param selectedGroup 
   */
  openProDetail(selectedGroup): void {
    this.openProPopup('detail', selectedGroup);
  }

  /**
   * Market Pro 신규 등록
   */
  proAdd(mode) {
    this.openProPopup(mode);
  }
  /**
   * Market Pro 삭제
   */
  proDelete() {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
