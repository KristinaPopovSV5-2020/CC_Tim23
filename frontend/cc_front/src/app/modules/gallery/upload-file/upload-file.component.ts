import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Content, GalleryService, UploadFile } from '../gallery.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OkDialogComponent } from '../../shared/ok-dialog/ok-dialog.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  implements OnInit{

  UploadForm !: FormGroup;
  newTag: string = '';
  tags: string[] = [];
  formData: FormData | undefined;
  selectedFile: File | null = null;
  path : string = '';


  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private galleryService: GalleryService,
    private dialog: MatDialog,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { value: string }){
      this.path = dialogData.value
    }
    
  ngOnInit(): void {
    this.UploadForm = this.formBuilder.group({
      filename:['',
          [
            Validators.required, this.hasSpecialCharacter,
          ],
      ],
      description:['',[]],
      tags:['',[]],  
      file: [''] 
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

  onFileSelected(event:any):void {
    this.selectedFile = event.target.files[0];

  }


  confirm(){
    if (this.UploadForm.valid){        
      this.dialogRef.close(this.dialogData.value);

    }
  }

  close(){
    this.dialogRef.close();
  }

  uploadFile() {
    if (this.selectedFile) {
      this.formData = new FormData();
      this.formData?.append('file', this.selectedFile, this.selectedFile.name);
      this.formData?.set('Content-Type', 'multipart/form-data');
      this.formData?.append('filename', this.parseFilename());
      this.formData?.append('size', this.selectedFile?.size.toString()!);
      this.formData?.append('type', this.selectedFile?.type! );

      this.formData?.append('desc', this.UploadForm.value.description);
      this.formData?.append('tags', this.tags.toString());
      this.galleryService.uploadFile(this.formData).subscribe({
        next:(res)=>{
          const dialogRef = this.dialog.open(OkDialogComponent, {
            data : {
              dialogMessage: "File uploaded."
            }
          })
        },
        error:(err)=> {
          if (err.status == 400) {
            alert("Choose a unique filename");
          }
        }
      })

      
  }
}
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.target !== document.querySelector('input')) {
      event.preventDefault();
    }
  }

  handleFileInput(l: FileList): void {
    this.selectedFile = l.item(0);
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)`: "";
      this.UploadForm.patchValue({file: `${f.name}${count}`});
    } else {
      this.UploadForm.patchValue({file: ``});
    }
  }

  parseFilename(): string | Blob {
    const fileParts = this.selectedFile?.name.split('.');
    return this.path + this.UploadForm.value.filename + "." + fileParts![fileParts!.length - 1];
  }

  hasSpecialCharacter(control: FormControl) {
    const regex = /[\\/.,_]/;

    if (regex.test(control.value)) {
      return { specialCharacter: true };
    }
    return null

  }
}



