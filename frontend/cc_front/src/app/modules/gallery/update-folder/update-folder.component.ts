import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { ShareContentComponent } from '../share-content/share-content.component';

@Component({
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrls: ['./update-folder.component.css']
})
export class UpdateFolderComponent {


  constructor(
    public dialogRef: MatDialogRef<UpdateFolderComponent>,
    public dialog: MatDialog,
    private galleryService: GalleryService){}


  deleteFolder(){

  }


  shareFolder(){
    const d = this.dialog.open(ShareContentComponent);

  }


  closeFolder(){
    this.dialogRef.close();

  }

}
