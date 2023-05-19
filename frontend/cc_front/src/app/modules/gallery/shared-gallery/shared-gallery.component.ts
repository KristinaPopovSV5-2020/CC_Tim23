import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewSharedContentComponent } from '../view-shared-content/view-shared-content.component';
import { ViewSharedFolderComponent } from '../view-shared-folder/view-shared-folder.component';

@Component({
  selector: 'app-shared-gallery',
  templateUrl: './shared-gallery.component.html',
  styleUrls: ['./shared-gallery.component.css']
})
export class SharedGalleryComponent implements OnInit {
  

  albums: any[]= [];
  subfolders: any []=[];
  contents: any[]=[];

  
  showButton = false;
  showButtonSub = false;



  constructor(private galleryService: GalleryService, private authService:AuthService,
    private dialog: MatDialog){}



    viewContent(content: any){
      const dialogRef = this.dialog.open(ViewSharedContentComponent,{
        data: content
      });

    }


    splitFilename(filename: string): string {
      const parts = filename.split('/');
      return parts[parts.length - 1];
    }
    
    ngOnInit(): void {
      this.galleryService.getSharedGallery().subscribe({
        next:(result)=>{
          console.log(result);
          this.albums=result.subfolders;
          this.contents = result.objects
        }
      })
      
    }

    onSubfolderClick(subfolder: any): void{
      const f = subfolder.username+"/"+ subfolder.album;
      const sub = f.replaceAll("/", ",");
      this.contents=[];
      this.subfolders=[];
      console.log(sub)
      this.galleryService.loadAlbum(sub).subscribe({
        next:(result)=>{
          this.subfolders=result.subfolders;
          this.contents = result.objects
        }
      })
    }
  
    onFolderClick(folder: any): void{
      const f = folder.username + "/"+ folder.album;
      const sub = f.replaceAll("/", ",");
      this.contents=[];
      this.subfolders=[];
      console.log(sub)
      this.galleryService.loadAlbum(sub).subscribe({
        next:(result)=>{
          this.subfolders=result.subfolders;
          this.contents = result.objects
        }
      })
    }


    openDialog(folder: any){
      const dialogRef = this.dialog.open(ViewSharedFolderComponent,{
        data: folder.username + "/" + folder.album
      });

    }


    



}
