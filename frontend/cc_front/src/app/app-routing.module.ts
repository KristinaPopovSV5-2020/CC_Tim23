import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { GalleryPhotoComponent } from './modules/gallery/gallery-photo/gallery-photo.component';
import { SharedGalleryComponent } from './modules/gallery/shared-gallery/shared-gallery.component';


const routes: Routes = [
    {path: 'home', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {path: 'gallery', component: GalleryPhotoComponent},
  {path: 'shared-gallery', component: SharedGalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }