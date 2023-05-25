import { Component, Inject } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SubfolderDialogComponent } from '../../shared/subfolder-dialog/subfolder-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.css']
})
export class InputNameComponent {

  InputForm !: FormGroup;
  path:string=this.auth.getUsername()+"/";

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InputNameComponent>,
    private galleryService: GalleryService,
    private dialog:MatDialog,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { value: string }){
    }
    


    ngOnInit(): void {
      this.InputForm = this.formBuilder.group({
        name:['',
            [
              Validators.required, this.hasSpecialCharacter
            ],
        ],
        
      });
      
    }


    confirm(){
      if (this.InputForm.valid){        
        this.galleryService.createAlbum(this.path+this.InputForm.value.name).subscribe({
          next:(res)=> {
            console.log(res)
            this.dialogRef.close(this.dialogData.value);
          }
        })

      }

    }

    addSubfolder() {
      const d = this.dialog.open(SubfolderDialogComponent);

      d.afterClosed().subscribe(result => {
        if (result) {
          this.path=result;
        }
      });
    }

    hasSpecialCharacter(control: FormControl) {
      const regex = /[\\/.,_]/;
  
      if (regex.test(control.value)) {
        return { specialCharacter: true };
      }
      return null
  
    }

}
