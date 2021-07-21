import {Component, Inject, OnInit, AfterContentInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {CommFacade} from '../../../../core/facade/comm.facade';
import { UserInterface } from 'src/app/data/schema/user';
import { ProFacade } from 'src/app/core/facade/pro.facade';
import { ProInterface, ProInfoInterface } from 'src/app/data/schema/pro';


@Component({
  selector: 'app-pro-form',
  templateUrl: './pro-form.component.html',
  styleUrls: ['./pro-form.component.css']
})
export class ProFormComponent implements OnInit, AfterContentInit  {

  mode: string;
  proForm: FormGroup;
  userList$: Observable<UserInterface[]>;
  uList: UserInterface[];

  numberPattern = '([0-9]{1,10})';
  selecteduserid: string;    // 사용자가 선택한 프로 아이디
  selectedprolevel: string;  // 사용자 선택한 프로 레벨
  new_profile_img: string;

  constructor(public dialogRef: MatDialogRef<ProFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private formBuilder: FormBuilder,
      private commFacade: CommFacade) { }

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.commFacade.getAllUser();
    this.userList$ = this.commFacade.getUserList();
    this.buildForm();
  }

  ngAfterContentInit(): void {
    this.uList = [];
    this.userList$.subscribe (
      response => {
        this.uList = response;
        //console.log(this.uList);
        this.selecteduserid = this.data.proInfo?.userid;
        this.proForm.controls.userid.setValue(this.selecteduserid);
      },
      err => console.log(err)
    );

    this.selectedprolevel = this.data.proInfo?.prolevel; 
    this.proForm.get('prolevel').setValue(this.selectedprolevel);
  }

  private buildForm(): void {
    this.proForm = this.formBuilder.group({
      id: this.data.proInfo?.id ?? '',
      profile_img: this.data.proInfo?.profile_img ?? '',
      userid: new FormControl(this.data.proInfo?.userid ?? '', [Validators.required]),
      lessonprice: new FormControl(this.data.proInfo?.lessonprice ?? '', [Validators.required, Validators.pattern(this.numberPattern)]),
      prolevel: new FormControl(this.data.proInfo?.prolevel ?? '', [Validators.required]),
      profile: new FormControl(this.data.proInfo?.profile ?? '', [Validators.required]),
      description: new FormControl(this.data.proInfo?.description ?? '', [Validators.required]),
      //profile_file: '',
    });

    
    if (this.mode !== 'new') {
      this.proForm.disable();
    }
  }

  save(): void {
    if (this.proForm.valid) {
      var saveData : ProInfoInterface = {
          id: this.proForm.controls.id.value,
          userid: this.proForm.controls.userid.value,
          lessonprice: this.proForm.controls.lessonprice.value,
          prolevel: this.proForm.controls.prolevel.value,
          profile: this.proForm.controls.profile.value,
          description: this.proForm.controls.description.value,
          org_profile_img: this.proForm.controls.profile_img.value,
          profile_img: this.new_profile_img,
          region: null,
          rating: null,
          use_yn: 'Y'
      }
      console.log(saveData);
      this.closeDialog('confirm', saveData);  // this.proForm.value);
    }
  }

  onFileChange(files: FileList) {
    console.log("onFileChange called");
    if (files && files.length > 0) {

      this.commFacade.uploadFile(files[0]).subscribe((res) => {
        console.log(res);
        this.new_profile_img = res.stre_file_name;
      });
    }else {
      // 파일을 삭제해야 한다.
      if (this.new_profile_img != null) {
        // 파일 삭제 처리
        this.commFacade.deleteFile(this.new_profile_img).subscribe((res) => {
          console.log(res);
          this.new_profile_img = null;
        });
      }
      
    }
  }

  closeDialog(t: string, proInfo?): void {
    if (t === 'cance' && this.mode === 'edit') {
      this.toggledEditForm();
    }else {
      this.dialogRef.close({type: t, data: proInfo ?? null});
    }
  }

  toggledEditForm(): void {
    if (this.mode === 'detail') {
      this.mode = 'edit';
      this.proForm.controls.userid.enable();
      this.proForm.controls.lessonprice.enable();
      this.proForm.controls.prolevel.enable();
      this.proForm.controls.profile.enable();
      this.proForm.controls.description.enable();    
    }else if(this.mode === 'edit') {
      this.mode = 'default';
      this.proForm.controls.userid.disable();
      this.proForm.controls.lessonprice.disable();
      this.proForm.controls.prolevel.disable();
      this.proForm.controls.profile.disable();
      this.proForm.controls.description.disable();
    }
  }

  compareObjects(obj1: any, obj2: any): boolean {
    // console.log(obj1 + " => " + obj2 + " : " + (obj1 === obj2) + "," + (obj1 === 'number') + "," + (obj2 === 'number'));
    var o1 = obj1+'';
    var o2 = obj2+'';
    if (o1 === o2) return true;
    else  return false;
  }

  compareProObjects(obj1: any, obj2: any): boolean {
   // console.log(obj1 + " => " + obj2 + " : " + (obj1 === obj2) + "," + (obj1 === 'number') + "," + (obj2 === 'number'));
    var o1 = obj1+'';
    var o2 = obj2+'';
    if (o1 === o2) return true;
    else  return false;
  }
}
