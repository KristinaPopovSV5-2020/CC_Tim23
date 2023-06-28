import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { SharedModule } from '../shared/shared.module';
import { SignupMemberComponent } from './signup-member/signup-member.component';
import { VerifyMemberComponent } from './verify-member/verify-member.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupMemberComponent,
    VerifyMemberComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
  ]
})
export class AuthModule { }
