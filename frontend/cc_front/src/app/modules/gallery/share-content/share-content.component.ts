import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService, ShareContent, SharedTable } from '../gallery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-share-content',
  templateUrl: './share-content.component.html',
  styleUrls: ['./share-content.component.css']
})
export class ShareContentComponent {


  ShareContentForm !: FormGroup;
  tags: string[] = [];
  newTag: string = '';
  contents: any []=[]



  constructor(public dialogRef: MatDialogRef<ShareContentComponent>,
    private galleryService: GalleryService,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string,){}


   

    ngOnInit(): void {
      const d = this.data.replaceAll('/',',');
      this.galleryService.getSharedContent(d).subscribe({
        next: (result) => {
          for (let i = 0; i <= result.objects.length; i++){
            this.tags.push(result.objects[i].sharedWith);
            this.contents.push(result.objects[i]);
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("greska");
          }
        },
      });
      this.ShareContentForm = this.formBuilder.group({
        users:['',
            [
            ],
        ],  
      });
      
    }
  
    addTag(): void {
      const tag = this.newTag.trim();
      let d : ShareContent ={
        filepath: this.data,
        sharedWith: tag

      }
      this.galleryService.shareContent(d).subscribe({
        next: (result) => {
          if (tag && !this.tags.includes(tag)) {
            this.tags.push(tag);
          }
          this.newTag = '';
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 404){
              alert("User does not exist!");
            }else if (error.status == 400){
              alert("Content has already been shared with the user!");
            }
          }
        },
      });
    }
  
    removeTag(tag: string): void {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
        for (const s of this.contents){
          if (s.sharedWith == tag){
            this.galleryService.deleteSharedContent(s.id).subscribe({
              next: (result) => {
                console.log("Deleted!");
              }
            });
          }
        }
      }
      
      
    }




    close(){
      this.dialogRef.close();
    }
      
  

}
