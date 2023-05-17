import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GalleryService } from '../gallery.service';
import { Observable, filter, of } from 'rxjs';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.component.html',
  styleUrls: ['./update-content.component.css']
})
export class UpdateContentComponent {

  UpdateContentForm !: FormGroup;
  public filename = "";
  public description = "";
  tags = ['Pizza', 'Pasta', 'Parmesan'];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateContentComponent>,
    private galleryService: GalleryService){}
   /* @Inject(MAT_DIALOG_DATA) public dialogData: { value: Content }){
      this.filename = dialogData.value.fileName;
      this.description = dialogData.value.desc;
    }*/
    


    ngOnInit(): void {
      this.UpdateContentForm = this.formBuilder.group({
        filename:['',
            [
              Validators.required,
            ],
        ],
        
      });
      
    }


    confirm(){
      if (this.UpdateContentForm.valid){        

      }

    }

    onAdding(tag: any): Observable<any> {
      const confirm = window.confirm('Do you really want to add this tag?');
      return of(tag).pipe(filter(() => confirm));
    }
  
    onRemoving(tag: any): Observable<any> {
      const confirm = window.confirm(
        'Do you really want to remove this tag?' + tag.name
      );
      return of(tag).pipe(filter(() => confirm));
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
