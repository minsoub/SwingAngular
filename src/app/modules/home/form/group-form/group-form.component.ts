import {Component, Inject, OnInit, AfterContentInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CommFacade} from '../../../../core/facade/comm.facade';
import {UserInterface} from '../../../../data/schema/user';



@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit, AfterContentInit {

  mode: string;
  groupForm: FormGroup;
  public dateFrom;
  public dateTo;
  userList$: Observable<UserInterface[]>;
  uList: UserInterface[];

  phonePattern = '([0-9]{9,11})';
  numberPattern = '([0-9]{1,5})';
  selectedgroupadminid: string;  // select box default value
  selectedstatus: string;

  constructor(public dialogRef: MatDialogRef<GroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private commFacade: CommFacade
    ) {

     }

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.userList$ = this.commFacade.getUserList();
    this.buildForm();
    this.commFacade.getAllUser();
  }

  ngAfterContentInit(): void {
    this.userList$.subscribe (
      response => {
        this.uList = response;
        console.log(this.uList);
        this.selectedgroupadminid = this.data.groupInfo?.groupadminid;
        console.log(this.selectedgroupadminid);
        this.groupForm.get('groupadminid').setValue(this.selectedgroupadminid);
      },
      err => console.log(err)
    );

    this.selectedstatus = this.data.groupInfo?.status;
    console.log(this.selectedstatus);    
    this.groupForm.get('status').setValue(this.selectedstatus);
  }

  compareObjects(obj1: any, obj2: any): boolean {
    return obj1 === obj2;
  }

  private buildForm(): void {
    this.groupForm = this.formBuilder.group({
      //id: new FormControl(this.data.id?.id ?? '')
      id: this.data.groupInfo?.id ?? '',
      startdate: this.data.groupInfo?.startdate ?? new Date(),
      enddate: this.data.groupInfo?.enddate ?? (new Date()).setDate((new Date()).getDate()+365),
      del_yn: this.data.groupInfo?.del_yn ?? 'N',
      groupname: new FormControl(this.data.groupInfo?.groupname ?? '', [Validators.required]),
      grouptype: new FormControl(this.data.groupInfo?.grouptype ?? '', [Validators.required]),
      quota: new FormControl(this.data.groupInfo?.quota ?? '', [Validators.required, Validators.pattern(this.numberPattern)]),
      storagespace: new FormControl(this.data.groupInfo?.storagespace ?? '', [Validators.required, Validators.pattern(this.numberPattern)]),
      address: new FormControl(this.data.groupInfo?.address ?? '', [Validators.nullValidator]),
      phone: new FormControl(this.data.groupInfo?.phone ?? '', [Validators.required, Validators.pattern(this.phonePattern)]),
      status: new FormControl(this.data.groupInfo?.status ?? '', [Validators.required]),
      groupadminid: new FormControl(this.data.groupInfo?.groupadminid ?? '', [Validators.required])
    });
  }

  toggleEditForm(): void {
    if (this.mode === 'detail') {
      this.mode = 'edit';
      this.groupForm.controls.groupname.enable();
      this.groupForm.controls.grouptype.enable();
      this.groupForm.controls.quota.enable();
      this.groupForm.controls.storagespace.enable();
      this.groupForm.controls.address.enable();
      this.groupForm.controls.phone.enable();
      this.groupForm.controls.status.enable();      
    }else if(this.mode === 'edit') {
      this.mode = 'default';
      this.groupForm.controls.groupname.disable();
      this.groupForm.controls.grouptype.disable();
      this.groupForm.controls.quota.disable();
      this.groupForm.controls.storagespace.disable();
      this.groupForm.controls.address.disable();
      this.groupForm.controls.phone.disable();
      this.groupForm.controls.status.disable();
    }
  }

  save(): void {
    if (this.groupForm.valid) {
      this.closeDialog('confirm', this.groupForm.value);
    }
  }

  closeDialog(t: string, groupInfo?): void {
    if (t === 'cancel' && this.mode === 'edit') {
      this.toggleEditForm();
    }else {
      this.dialogRef.close({type: t, data: groupInfo ?? null});
    }
  }

}
