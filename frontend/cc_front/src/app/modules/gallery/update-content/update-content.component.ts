import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { Observable, filter, of } from 'rxjs';
import { ShareContentComponent } from '../share-content/share-content.component';
import { YesNoDialogComponent } from '../../shared/yes-no-dialog/yes-no-dialog.component';
import { SubfolderDialogComponent } from '../../shared/subfolder-dialog/subfolder-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  public path="";
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateContentComponent>,
    public dialog: MatDialog,
    private galleryService: GalleryService){
      const lastIndex = data.filename.lastIndexOf('/');
      const lastDot=data.filename.lastIndexOf('.');
      this.path=data.filename.substring(0,lastIndex)+"/";
      this.filename = data.filename.substring(lastIndex+1,lastDot);
      this.description = data.description;
      this.album = data.album;
      this.dateCreated = data.dateCreated;
      this.dateModified = data.dateModified;
      this.type =data.fileType;
      this.size = data.fileSize;
      if (this.data.tags != "")
        this.tags = this.data.tags.split(",")
    }
    tags: string[] = [];
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
              Validators.required, this.hasSpecialCharacter
            ],
        ],
        description:['',
        [
          Validators.required,
        ]
      ],
        tags:['',[]],   
      });
      
    }


    confirm(){
      if (this.UpdateContentForm.valid){   
        console.log(this.filename);     
        let t =this.type.split('/')
        this.galleryService.updateFile(this.data.id,{fileName:this.path+this.filename+"."+t[1],tags:this.tags,desc:this.description}).subscribe({
          next:(result)=>{
            alert("File updated")
            
          },
          error:(error)=>{
            if (error instanceof HttpErrorResponse){
              if(error.status==400){
                alert("Name already exists")
              }
            }
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
              alert("File deleted")
            },
            error:(error)=>{

            }
          })
        }
      });


    }
   
    shareContent(){
      const d = this.dialog.open(ShareContentComponent, {data:this.data.filename});
  
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

openSubfolderDialog(){
      const d = this.dialog.open(SubfolderDialogComponent);

      d.afterClosed().subscribe(result => {
        if (result) {
          this.galleryService.moveFile({id:this.data.id,album:result}).subscribe({
            next:(result)=>{
              alert("File moved")
              
            },
            error:(error)=>{

            }
          })
        }
      });
    }

    hasSpecialCharacter(control: FormControl) {
      const regex = /[\\/.,_]/;
  
      if (regex.test(control.value)) {
        return { specialCharacter: true };
      }
      return null
  
    }

    

  


}

