import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { Observable, filter, of } from 'rxjs';

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
  

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateContentComponent>,
    private galleryService: GalleryService){}
   /* @Inject(MAT_DIALOG_DATA) public dialogData: { value: Content }){
      this.filename = dialogData.value.fileName;
      this.description = dialogData.value.desc;
      this.album = dialogData.value.album;
      this.dateCreated = dialogData.value.dateCreated;
      this.dateModified = dialogData.value.dateModified;
      this.type =dialogData.value.type;
      this.size = dialogData.value.size;
    }*/
    tags: string[] = ['Tag 1', 'Tag 2', 'Tag 3'];
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

      }

    }


    deleteContent(){

    }


    shareContent(){

    }

    

  


}


//OVO SIG TREBA PROMENITI
export interface Content{
  album: string,
  dateCreated: string,
  dateModified: string,
  desc: string,
  fileName: string,
  filesize: number,
  fileType: string,
  tags: string[],
  user: string,
  userEmail: string
}
