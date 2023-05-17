import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPhotoComponent } from './gallery-photo/gallery-photo.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { SharedModule } from '../shared/shared.module';
import { InputNameComponent } from './input-name/input-name.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UpdateContentComponent } from './update-content/update-content.component';



@NgModule({
  declarations: [
    GalleryPhotoComponent,
    InputNameComponent,
    UploadFileComponent,
    UpdateContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ]
})
export class GalleryModule { }
