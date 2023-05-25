import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateFolderComponent>,
    public dialog: MatDialog,
    private galleryService: GalleryService){}


  deleteFolder(){
    const d = this.dialog.open(YesNoDialogComponent);

    d.afterClosed().subscribe(result => {
      if (result) {
        this.galleryService.deleteAlbum(this.data.replaceAll("/", ",")).subscribe({
          next:(res)=>{
            console.log(res)
          }
        })
      }
    });

  }


  shareFolder(){
    const d = this.dialog.open(ShareContentComponent, {data:this.data});

  }


  closeFolder(){
    this.dialogRef.close();

  }

}
