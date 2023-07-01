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
    this.path = this.authService.getUsername() + "/";
    const sub = this.path.replaceAll("/", ",");
    this.galleryService.loadAlbum(sub).subscribe({
      next:(result)=>{
        this.albums=result.subfolders;
        this.contents = result.objects
      }
    })
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
      data: { value: this.path }
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

  onSubfolderClick(subfolder: string): void{
    this.path = this.path + subfolder + "/";
    const sub = this.path.replaceAll("/", ",");
    this.contents=[];
    this.subfolders=[];
    console.log(sub)
    this.galleryService.loadAlbum(sub).subscribe({
      next:(result)=>{
        console.log(result);
        this.subfolders=result.subfolders;
        this.contents = result.objects
      }
    })
  }

  onFolderClick(folder: any): void{
    this.path = this.authService.getUsername()+"/"
    this.path = this.path + folder + "/";
    const sub = this.path.replaceAll("/", ",");
    this.contents=[];
    this.subfolders=[];
    console.log(sub)
    this.galleryService.loadAlbum(sub).subscribe({
      next:(result)=>{
        console.log(result);
        this.subfolders=result.subfolders;
        this.contents = result.objects
      }
    })
  }


  editContent(content: any): void{
    const dialogRef = this.dialog.open(UpdateContentComponent,{
      data: content
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const lastIndex = content.filename.lastIndexOf('/');
        const album=(content.filename.substring(0,lastIndex)+"/").replaceAll("/",",")
        this.galleryService.loadAlbum(album).subscribe({
          next:(result)=>{
            this.contents = result.objects
          }
        })
      }
    });
  }


  openDialog(folder: any): void {
    const f = this.path + folder;
    this.dialog.open(UpdateFolderComponent, {
      data: f
    });
  }

  splitFilename(filename: string): string {
    const parts = filename.split('/');
    return parts[parts.length - 1];
  }

  splitAlbumName(album: string): string {
    const parts = album.split('/');
    return parts[parts.length - 1];
  }
  
}

export interface Folder {
  name: string
}

export interface GalleryResponse {
  subfolders:string[],
  objects:FileData[]
}

export interface FileData {
  s3_object: string;
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

