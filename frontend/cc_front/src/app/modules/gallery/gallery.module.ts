import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPhotoComponent } from './gallery-photo/gallery-photo.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { SharedModule } from '../shared/shared.module';
import { InputNameComponent } from './input-name/input-name.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UpdateContentComponent } from './update-content/update-content.component';
import { UpdateFolderComponent } from './update-folder/update-folder.component';
import { ShareContentComponent } from './share-content/share-content.component';
import { SharedGalleryComponent } from './shared-gallery/shared-gallery.component';
import { ViewSharedContentComponent } from './view-shared-content/view-shared-content.component';
import { ViewSharedFolderComponent } from './view-shared-folder/view-shared-folder.component';
import { FamilyMemberComponent } from './family-member/family-member.component';



@NgModule({
  declarations: [
    GalleryPhotoComponent,
    InputNameComponent,
    UploadFileComponent,
    UpdateContentComponent,
    UpdateFolderComponent,
    ShareContentComponent,
    SharedGalleryComponent,
    ViewSharedContentComponent,
    ViewSharedFolderComponent,
    FamilyMemberComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class GalleryModule { }
