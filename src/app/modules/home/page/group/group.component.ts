import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router';
import { GroupContextInterface } from 'src/app/data/schema/group';
import { GroupFacade } from '../../../../core/facade/group.facade';
import {MatDialog} from '@angular/material/dialog';
import {GroupFormComponent} from '../../form/group-form/group-form.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  dataSource = new MatTableDataSource<GroupContextInterface>([]);
  selection = new SelectionModel<GroupContextInterface>(true, []);
  listCount: number;

  displayedColumns: string[] = ['select', 'id', 'groupname', 'groupadminid', 'grouptype', 'storagespace', 'quota', 'status'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private groupFacade: GroupFacade,) {
      
      groupFacade.getGroupList().subscribe((lists) => {
          this.dataSource.data = lists;
          this.listCount = lists.length;
      });
  }

  ngOnInit(): void {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.searchGroup();
  }

  /**
   * 그룹정보 신규 등록 및 수정 팝업 호출
   * @param mode 
   * @param selectedGroup 
   */
  openGroupPopup(mode, selectedGroup?): void {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: '550px',
      disableClose: true, 
      data: {groupInfo: selectedGroup ?? null, mode: mode}
    });

    // 저장한다.
    dialogRef.beforeClosed().subscribe(result => {
      if (result.type === 'confirm') {
        this.groupFacade.saveGroup(result.data).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }
  /**
   * 신규 등록
   * @param mode 
   */
  groupAdd(mode) {
    this.openGroupPopup(mode);
  }
  /**
   * 그룹정보 수정
   * @param selectedGroup 
   */
  openGroupDetail(selectedGroup): void {
    this.openGroupPopup('detail', selectedGroup);
  }  
  searchGroup() {
    this.groupFacade.searchGroupList();
  }

  groupDelete() {
    console.log(this.selection);
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
