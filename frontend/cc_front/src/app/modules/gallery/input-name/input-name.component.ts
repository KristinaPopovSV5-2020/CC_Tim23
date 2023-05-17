import { Component, Inject } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css']
})
export class InputNameComponent {

  InputForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InputNameComponent>,
    private galleryService: GalleryService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { value: string }){
    }
    


    ngOnInit(): void {
      this.InputForm = this.formBuilder.group({
        name:['',
            [
              Validators.required,
            ],
        ],
        
      });
      
    }


    confirm(){
      if (this.InputForm.valid){        
        this.dialogRef.close(this.dialogData.value);

      }

    }

}
