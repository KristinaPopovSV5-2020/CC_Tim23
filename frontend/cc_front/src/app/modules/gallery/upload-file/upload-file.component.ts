import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../gallery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  implements OnInit{

  file_upload: File | null | undefined;

  UploadForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private galleryService: GalleryService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { value: string }){
    }
    



  ngOnInit(): void {
    this.UploadForm = this.formBuilder.group({
      file:['',
          [
            Validators.required,
          ],
      ],
      
    });
    
  }




  handleFileInputChangePicture(l: FileList): void {
    this.file_upload = l.item(0);
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.UploadForm.patchValue({file: `${f.name}${count}`});
      
    } else {
      this.UploadForm.patchValue({file: ``});
    }
  }


  confirm(){
    if (this.UploadForm.valid){        
      this.dialogRef.close(this.dialogData.value);

    }

  }


}
