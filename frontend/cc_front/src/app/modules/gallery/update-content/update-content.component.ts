import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { Observable, filter, of } from 'rxjs';
import { ShareContentComponent } from '../share-content/share-content.component';
import { YesNoDialogComponent } from '../../shared/yes-no-dialog/yes-no-dialog.component';
import { SubfolderDialogComponent } from '../../shared/subfolder-dialog/subfolder-dialog.component';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.component.html',
  styleUrls: ['./update-content.component.css']
})
export class UpdateContentComponent implements OnInit {

  UpdateContentForm !: FormGroup;
  public filename = "";
  public description = "";
  public album = "Masa";
  public dateCreated = "23/09/1002";
  public dateModified = "12/09/2009";
  public type = "jpg";
  public size = "100 MB";
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateContentComponent>,
    public dialog: MatDialog,
    private galleryService: GalleryService){
      console.log(data);
      this.filename = data.filename;
      this.description = data.description;
      this.album = data.album;
      this.dateCreated = data.dateCreated;
      this.dateModified = data.dateModified;
      this.type =data.fileType;
      this.size = data.fileSize;
    }
    tags: string[] = this.data.tags.split(",");
  newTag: string = '';

  addTag(): void {
    const tag = this.newTag.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.newTag = '';
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }
    


    ngOnInit(): void {
      this.UpdateContentForm = this.formBuilder.group({
        filename:['',
            [
              Validators.required,
            ],
        ],
        description:['',[]],
        tags:['',[]],   
      });
      
    }


    confirm(){
      if (this.UpdateContentForm.valid){   
        console.log(this.filename);     
        this.galleryService.updateFile(this.data.id,{fileName:this.filename,tags:this.tags,desc:this.description}).subscribe({
          next:(result)=>{
            console.log(result);
            
          }
        })
      }

    }

    close(){
      this.dialogRef.close("a");
    }


    deleteContent(){
      const d = this.dialog.open(YesNoDialogComponent);

      d.afterClosed().subscribe(result => {
        if (result) {
          this.galleryService.deleteFile(this.data.id).subscribe({
            next:(result)=>{
              console.log(result);
              
            }
          })
        }
      });


    }
   
    shareContent(){
      const d = this.dialog.open(ShareContentComponent);
  
    }

    openSubfolderDialog(){
      const d = this.dialog.open(SubfolderDialogComponent);

      d.afterClosed().subscribe(result => {
        if (result) {
          this.galleryService.moveFile({id:this.data.id,album:result}).subscribe({
            next:(result)=>{
              console.log(result);
              
            }
          })
        }
      });
    }

    

  


}

