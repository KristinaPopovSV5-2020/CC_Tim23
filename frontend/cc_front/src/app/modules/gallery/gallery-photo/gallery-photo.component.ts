import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { InputNameComponent } from '../input-name/input-name.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UpdateContentComponent } from '../update-content/update-content.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';

@Component({
  selector: 'app-gallery-photo',
  templateUrl: './gallery-photo.component.html',
  styleUrls: ['./gallery-photo.component.css']
})
export class GalleryPhotoComponent implements OnInit {

  folders: any[] = [];
  subfolders: any[] = [];
  contents: any[] = [];
  public path = "";

  showButton = false;
  showButtonSub = false;

  constructor(private galleryService: GalleryService,
    private dialog: MatDialog){}



  ngOnInit(): void {
    const f1: Folder ={
      name: "folder1"
    }
    const f2: Folder ={
      name: "folder2"
    }
    const f3: Folder ={
      name: "folder3"
    }
    this.folders.push(f1);
    this.folders.push(f2);
    this.folders.push(f3);
    this.subfolders.push(f1);
    this.subfolders.push(f2);
    this.subfolders.push(f3);
    this.contents.push(f1);
    this.contents.push(f2);
    this.contents.push(f3);
    this.path = "masa/";
  }


  addFolder(){
    const dialogRef = this.dialog.open(InputNameComponent, {
      data: { value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const f: Folder ={
          name: result
        }
        this.folders.push(f);
        //location.reload();
      }
    });

  }


  addSubfolder(){
    const dialogRef = this.dialog.open(InputNameComponent, {
      data: { value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const f: Folder ={
          name: result
        }
        this.subfolders.push(f);
        //location.reload();
      }
    });


  }


  addContent(){
    const dialogRef = this.dialog.open(UploadFileComponent, {
      data: { value: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const f: Folder ={
          name: result
        }
        this.contents.push(f);
        //location.reload();
      }
    });



  }

  onSubfolderClick(subfolder: any): void{
    this.path = this.path + subfolder.name + "/";
    //da se ucitaju svi subfolderi ove putanje i kontentni i azuriraju liste
  }

  onFolderClick(folder: any): void{
    this.path = folder.name + "/";
    //da se ucitaju svi subfolderi  i kontentni ovog foldera i azuriraju liste
  }


  editContent(content: any): void{
    const dialogRef = this.dialog.open(UpdateContentComponent);

  }


  openDialog(folder: any): void {
    this.dialog.open(UpdateFolderComponent, {
    });
  }

}







export interface Folder {
  name: string
}


