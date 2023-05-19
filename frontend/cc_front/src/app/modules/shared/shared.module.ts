import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LinkComponent } from './link/link.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { MaterialModule } from '../../../infrastructure/material.module';
import { SubfolderDialogComponent } from './subfolder-dialog/subfolder-dialog.component';



@NgModule({
  declarations: [ButtonComponent,LinkComponent, ErrorDialogComponent, OkDialogComponent,YesNoDialogComponent,SubfolderDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[ButtonComponent,LinkComponent]
})
export class SharedModule { }