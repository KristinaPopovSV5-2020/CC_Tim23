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

  UploadForm !: FormGroup;
  newTag: any;
  tags: any;
  selectedFile: File | null = null;


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

  onFileSelected(event:any):void {
    this.selectedFile = event.target.files[0];

  }


  confirm(){
    if (this.UploadForm.valid){        
      this.dialogRef.close(this.dialogData.value);

    }

  }

  uploadFile() {
    if (this.selectedFile) {
      const fileContent = new Blob([this.selectedFile], { type: this.selectedFile.type });
      const fileSize = this.selectedFile.size;
      const fileType = this.selectedFile.type;

  }

}

}
