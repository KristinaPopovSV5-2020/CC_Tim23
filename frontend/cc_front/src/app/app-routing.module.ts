import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { GalleryPhotoComponent } from './modules/gallery/gallery-photo/gallery-photo.component';
import { SharedGalleryComponent } from './modules/gallery/shared-gallery/shared-gallery.component';
import { FamilyMemberComponent } from './modules/gallery/family-member/family-member.component';
import { SignupMemberComponent } from './modules/auth/signup-member/signup-member.component';
import { VerifyMemberComponent } from './modules/auth/verify-member/verify-member.component';


const routes: Routes = [
    {path: 'home', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {path: 'gallery', component: GalleryPhotoComponent},
  {path: 'shared-gallery', component: SharedGalleryComponent},
  {path:'family-member', component: FamilyMemberComponent},
  {path: 'signup-member', component:SignupMemberComponent},
  { path: 'verify-member/:username/:invitedUsername', component: VerifyMemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }