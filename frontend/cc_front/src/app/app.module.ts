import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './modules/auth/interceptor/interceptor.interceptor';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { LayoutModule } from './modules/layout/layout.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from './modules/gallery/gallery.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule, 
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    LayoutModule,
    SharedModule,
    HttpClientModule,
    GalleryModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
