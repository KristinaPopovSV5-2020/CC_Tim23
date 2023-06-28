import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { validateRePassword } from '../signup/custom-validator/validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { OkDialogComponent } from '../../shared/ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-signup-member',
  templateUrl: './signup-member.component.html',
  styleUrls: ['./signup-member.component.css']
})
export class SignupMemberComponent implements OnInit{
  memberForm !: FormGroup;
  hide = true;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService){
    }

  ngOnInit(){
    this.memberForm = this.formBuilder.group({
      name: [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z]+'),

      ],
      ],
      surname: [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z]+'),

      ],
      ],
      birth:  [
        '',
        [
        Validators.required,
        ],
      ],
      username:  [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
        ],
      ],
      invitedUsername:  [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
        ],
      ],
      email:['',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
      ],
      ],
      password:['',
          [
            Validators.required,
            Validators.minLength(8),
            this.hasCapitalLetter,
            this.hasSpecialCharacter,
            this.hasNumber
          ],
      ],
      confirmpsw:['',
          [
            Validators.required,
            validateRePassword,
          ],
      ],


    });
  }

  confirm() : void{
    if(this.memberForm.valid){
      const dateToFormat = new Date(this.memberForm.value.birth);
      const formattedDate = `${dateToFormat.getFullYear()}/${(dateToFormat.getMonth() + 1).toString().padStart(2, '0')}/${dateToFormat.getDate().toString().padStart(2, '0')}`;
      this.authService.signUpMember({
        name: this.memberForm.value.name,
        surname: this.memberForm.value.surname,
        email: this.memberForm.value.email,
        birth:formattedDate,
        password: this.memberForm.value.password,
        username:this.memberForm.value.username,
        invitedUsername: this.memberForm.value.invitedUsername
      }).subscribe({
        next: (result) => {
          alert("Success!")
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
              alert("");
          }
        },
      });

    }else{
    }


    

  }

 
  openErrorDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {dialogMessage: message},
    });
  }


  openOKDialog(message: string) {
    const dialogRef = this.dialog.open(OkDialogComponent, {
      data: {dialogMessage: message},
    });
  }

  hasSpecialCharacter(control: FormControl) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!regex.test(control.value)) {
      return { specialCharacter: true };
    }

    return null;
  }

  hasCapitalLetter(control: FormControl) {
    const regex = /[A-Z]/;

    if (!regex.test(control.value)) {
      return { capitalLetter: true };
    }

    return null;
  }

  hasNumber(control: FormControl) {
    const regex = /\d/;

    if (!regex.test(control.value)) {
      return { num: true };
    }

    return null;
  }

}
