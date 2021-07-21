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
import { ProFormComponent } from '../../form/pro-form/pro-form.component';


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
      if (lists != null)
      {
        console.log(lists);
        console.log(lists.list);
        this.dataSource.data = lists.list;
        this.listCount = lists.list.length;
      }
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
   * @param selectedData 
   */
  openProPopup(mode, selectedData?): void {
    const dialogRef = this.dialog.open(ProFormComponent, {
      width: '550px',
      height: '620px',
      disableClose: true,
      data: {proInfo: selectedData ?? null, mode: mode}
    });

    // 저장을 수행한다.
    dialogRef.beforeClosed().subscribe(result => {
      if (result.type === 'confirm') {
        this.proFacade.savePro(result.data).subscribe((res) => {
          console.log(res);
          this.alertService.openAlert("저장을 완료하였습니다!!!");
          this.searchPro();
        })
      }
    });
  }
  /**
   * Market Pro 정보 상세 보기 클릭
   * @param selectedData 
   */
  openProDetail(selectedData): void {
    this.openProPopup('detail', selectedData);
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
