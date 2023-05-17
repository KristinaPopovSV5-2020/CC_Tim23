import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent {

  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.local_data = {data};
  }

  accept(){
    this.dialogRef.close({accept:true});
  }

  deny(){
    this.dialogRef.close({accept:false});
  }

}

