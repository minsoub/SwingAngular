import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router';
import { GroupContextInterface, GroupAdminInterface } from 'src/app/data/schema/group';
import { GroupFacade } from '../../../../core/facade/group.facade';
import {MatDialog} from '@angular/material/dialog';
import {GroupFormComponent} from '../../form/group-form/group-form.component';
import {AlertService} from '../../../../shared/service/alert.service';
import {ConfirmComponent} from '../../../../shared/component/confirm/confirm.component';
import {Logger} from '../../../../core/logger.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  private readonly log = new Logger(this.constructor.name);
  //dataSource = new MatTableDataSource<GroupContextInterface>([]);
  dataSource = new MatTableDataSource<GroupAdminInterface>([]);  
  selection = new SelectionModel<GroupAdminInterface>(true, []);
  adminInfoList: GroupAdminInterface[] = [];
  listCount: number;

  displayedColumns: string[] = ['select', 'id', 'groupname', 'groupadminname', 'grouptype', 'storagespace', 'quota', 'status'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private groupFacade: GroupFacade,
              private alertService: AlertService) {
      
      groupFacade.getGroupList().subscribe((lists) => {     
        console.log(lists);
        if (lists != null) {
          this.adminInfoList = [];
          console.log("lists count => " + lists.grouplist.length);
          for (let i=0; i<lists.grouplist.length; i++) {
            var data:GroupAdminInterface = {
                id: lists.grouplist[i].id,
                region: lists.grouplist[i].region,
                groupname : lists.grouplist[i].groupname,
                grouptype : lists.grouplist[i].grouptype,
                address : lists.grouplist[i].address,
                phone : lists.grouplist[i].phone,
                quota : lists.grouplist[i].quota,
                storagespace : lists.grouplist[i].storagespace,
                status : lists.grouplist[i].status,
                startdate : lists.grouplist[i].startdate,
                enddate : lists.grouplist[i].enddate,
                groupadminid : lists.grouplist[i].groupadminid,
                registerdate : lists.grouplist[i].registerdate,
                del_yn : lists.grouplist[i].del_yn,
                email: null,
                firstname: null,
                lastname: null,
                groupadminname: null,
                membercount: 0
            }
            console.log(data);
            let dd: any = lists.groupadminlist.find(x => x.id == data.id);
            if(dd instanceof Object){
              console.log("data => " + dd);
              data.email= dd.email;
              data.firstname = dd.firstname;
              data.lastname = dd.lastname;
              data.groupadminname = dd.groupadminname;
              data.groupadminid = dd.groupadminid;
              data.membercount = dd.membercount;              
            }

           
            this.adminInfoList.push(data);
          } 
          this.dataSource.data = this.adminInfoList;          
          this.listCount = lists.grouplist.length;
        }
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
          this.alertService.openAlert("저장을 완료하였습니다!!!");
          this.searchGroup();
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
    console.log(this.selection.selected);
    console.log(this.selection.selected.length);
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        disableClose: false,
        data: {msg: '선택된 데이터를 삭제하시겠습니까? '}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.log.debug(result);
        if (result.type === 'confirm') {
          this.groupFacade.deleteGroup(this.selection.selected).subscribe((res) => {
            console.log(res);
            this.alertService.openAlert("삭제를 완료하였습니다!!!");
            this.searchGroup();
          });        
          //this.trmnlFacade.resetMyTrmnl(this.authFacade.getEmail());
        }
      });
    }else {
      this.alertService.openAlert("체크박스를 선택하세요!!!");
    }
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
