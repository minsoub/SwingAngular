import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from '../component/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  openAlert(message: string): void {
    this.dialog.open(AlertComponent, {
      disableClose: true, 
      data: {msg: message}
    });
  }
}
