import { Component, Inject, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-shared-content',
  templateUrl: './view-shared-content.component.html',
  styleUrls: ['./view-shared-content.component.css']
})
export class ViewSharedContentComponent implements OnInit{

  public filename = "";
  public description = "";
  public album = "Masa";
  public dateCreated = "23/09/1002";
  public dateModified = "12/09/2009";
  public type = "jpg";
  public size = "100 MB";
  public tags = "slika";
  public user = ""


  constructor( private galleryService: GalleryService,
    public dialogRef: MatDialogRef<ViewSharedContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ){
      let parts: any[] = data.filename.split("/")
      this.filename = parts[parts.length - 1];
      this.user = parts[0];
      this.description = data.description;
      this.album = data.album;
      this.dateCreated = data.dateCreated;
      this.dateModified = data.dateModified;
      this.type =data.fileType;
      this.size = data.fileSize;
      this.tags = data.tags;
    }

    ngOnInit(): void {
      
    }



    download() {
      const content = "data:" + this.type + ";base64," + this.data.s3_object;
      const link = document.createElement("a");
      link.download = this.data.filename;
      link.href = content;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    close(){
      this.dialogRef.close();
    }

}
