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
    console.log(this.dialogData.value)
    this.UploadForm = this.formBuilder.group({
      filename: ['', Validators.required],
      description: [''],
      tags: [''],
      file: ['', Validators.required]
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
      const filename = this.UploadForm.value.filename;
      const description = this.UploadForm.value.description;
      const tags = this.tags;
      const file = this.UploadForm.value.file;
      this.dialogRef.close(this.dialogData.value);
    }
  }

}


