import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { InputNameComponent } from '../input-name/input-name.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UpdateContentComponent } from '../update-content/update-content.component';
import { UpdateFolderComponent } from '../update-folder/update-folder.component';
import { AuthService } from '../../auth/auth.service';

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
  albums: string[] = [];

  showButton = false;
  showButtonSub = false;

  constructor(private galleryService: GalleryService, private authService:AuthService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this.galleryService.loadGallery().subscribe({
      next: (res) => {
        this.albums = res.albums;
      },
    })
    this.path = this.authService.getUsername() + "/";
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

  handleButtonClick(album:string) {

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
    this.path = folder + "/";
    this.galleryService.loadAlbum(folder).subscribe({
      next:(res)=>{
        console.log(res);
        this.contents=res;
      }
    })
  }


  editContent(content: any): void{
    const dialogRef = this.dialog.open(UpdateContentComponent);
  }


  openDialog(folder: any): void {
    this.dialog.open(UpdateFolderComponent, {
    });
  }

  splitFilename(filename: string): string {
    const parts = filename.split('/');
    return parts[parts.length - 1];
  }
  
}

export interface Folder {
  name: string
}

export interface FileData {
  s3_object: string;
  dynamoAttributes: {
    filename: string;
    album: string;
    dateCreated: string;
    fileSize: string;
    dateModified: string;
    fileType: string;
    username: string;
    id: string;
    tags: string;
    desc: string;
  };
}

export interface UploadFile {
  content: string;
  fileName: string;
  album: string;
  fileType: string;
  fileSize: string;
  dateCreated: string;
  dateModified: string;
  desc: string;
  tags: string;
}


