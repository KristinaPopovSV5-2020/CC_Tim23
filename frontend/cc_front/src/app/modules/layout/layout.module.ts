import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/infrastructure/material.module';



@NgModule({
  declarations: [
    ToolbarComponent,
    UserToolbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent,
    UserToolbarComponent,
],
})
export class LayoutModule { }
