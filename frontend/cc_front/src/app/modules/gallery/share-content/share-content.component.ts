import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../gallery.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-content',
  templateUrl: './share-content.component.html',
  styleUrls: ['./share-content.component.css']
})
export class ShareContentComponent {


  ShareContentForm !: FormGroup;



  constructor(public dialogRef: MatDialogRef<ShareContentComponent>,
    private galleryService: GalleryService,
    public formBuilder: FormBuilder){}


    tags: string[] = ['User 1', 'User 2', 'User 3'];
    newTag: string = '';

    ngOnInit(): void {
      this.ShareContentForm = this.formBuilder.group({
        users:['',
            [
            ],
        ],  
      });
      
    }
  
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




    close(){
      this.dialogRef.close();
    }
      
  

}
