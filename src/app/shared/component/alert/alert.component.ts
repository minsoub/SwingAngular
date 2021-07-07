import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponent>, 
                @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close({type: 'confirm'});
  }

}
