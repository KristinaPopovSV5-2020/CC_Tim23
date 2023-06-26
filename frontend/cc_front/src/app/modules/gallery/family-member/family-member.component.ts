import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.css']
})
export class FamilyMemberComponent implements OnInit {

  emailForm !: FormGroup;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService){
    }


    ngOnInit(): void {
      this.emailForm = this.formBuilder.group({
        email:['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
        ],
        ],
      });
    }



    invite(): void{
      
    }

}
