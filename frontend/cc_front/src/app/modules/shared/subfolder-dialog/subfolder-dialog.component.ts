import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../../gallery/gallery.service';

@Component({
  selector: 'app-subfolder-dialog',
  templateUrl: './subfolder-dialog.component.html',
  styleUrls: ['./subfolder-dialog.component.css']
})
export class SubfolderDialogComponent implements OnInit {
  subfolders:any;

  constructor(
    public dialogRef: MatDialogRef<SubfolderDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: boolean,
    private galleryService:GalleryService) {
    this.subfolders = data;
  }
  ngOnInit(): void {
    this.galleryService.getSubfolders().subscribe({
      next:(result)=>{
        console.log(result);
        this.subfolders=result.filenames;
        
      }
    })
  }

  choose(sub:string){
    this.dialogRef.close(sub);
  }


}
