import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { OkDialogComponent } from '../../shared/ok-dialog/ok-dialog.component';
import { AuthService } from '../auth.service';
import { validateRePassword } from './custom-validator/validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm !: FormGroup;
  hide = true;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService){
    }

  ngOnInit(){
    this.signupForm = this.formBuilder.group({
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

  signup() : void{
    if(this.signupForm.valid){
      const dateToFormat = new Date(this.signupForm.value.birth);
      const formattedDate = `${dateToFormat.getFullYear()}/${(dateToFormat.getMonth() + 1).toString().padStart(2, '0')}/${dateToFormat.getDate().toString().padStart(2, '0')}`;
      this.authService.signUp({
        name: this.signupForm.value.name,
        surname: this.signupForm.value.surname,
        email: this.signupForm.value.email,
        birth:formattedDate,
        password: this.signupForm.value.password,
        username:this.signupForm.value.username
      }).subscribe({
        next: (result) => {
          alert("Success!")
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
              alert("Username already exists");
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



