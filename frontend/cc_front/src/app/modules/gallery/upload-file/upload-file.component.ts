import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService, UploadFile } from '../gallery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  implements OnInit{

  file_upload: File | null | undefined;

  UploadForm !: FormGroup;
  newTag: any;
  tags: any;

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

  processFileUpload(file: File, filename: string, album: string, description: string, tags: string): UploadFile {
    const currentDate = new Date().toLocaleDateString(); // Get the current date as a string
    const fileType = file.type; // Retrieve the file type from the uploaded file
    const fileSize = `${(file.size / 1024).toFixed(2)}KB`; // Calculate the file size in KB
    
    const content: UploadFile = {
      content: '',
      fileName: filename,
      album: album,
      fileType: fileType,
      fileSize: fileSize,
      dateCreated: currentDate,
      dateModified: currentDate,
      desc: description,
      tags: tags,
    };
  
    return content;
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


