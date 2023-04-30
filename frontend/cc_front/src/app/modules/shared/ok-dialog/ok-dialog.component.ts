import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogData } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.css']
})
export class OkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}