import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-view-shared-folder',
  templateUrl: './view-shared-folder.component.html',
  styleUrls: ['./view-shared-folder.component.css']
})
export class ViewSharedFolderComponent {

  public user="";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ViewSharedFolderComponent>,
    public dialog: MatDialog,
    private galleryService: GalleryService){
      let parts: any[] = data.split("/")
      this.user = parts[0];
    }





  downloadFolder(){

  }

  closeFolder(){
    this.dialogRef.close();

  }

}
