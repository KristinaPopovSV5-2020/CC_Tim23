import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { ShareContentComponent } from '../share-content/share-content.component';
import { YesNoDialogComponent } from '../../shared/yes-no-dialog/yes-no-dialog.component';

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
    const d = this.dialog.open(YesNoDialogComponent);

    d.afterClosed().subscribe(result => {
      if (result) {
        //api da obrise 
      }
    });

  }


  shareFolder(){
    const d = this.dialog.open(ShareContentComponent);

  }


  closeFolder(){
    this.dialogRef.close();

  }

}
