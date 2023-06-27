import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
  }

  url="https://de4qepe40m.execute-api.eu-north-1.amazonaws.com/prod";

  loadGallery(): Observable<any> {
    return this.http.get(this.url+"/gallery",);
  }

  loadAlbum(album:string): Observable<any> {
    return this.http.get(this.url+"/gallery/" + album,);
  }

  deleteAlbum(album:string): Observable<any> {
    return this.http.delete(this.url+"/gallery/" + album,);
  }

  uploadFile(file:FormData): Observable<any> {
    return this.http.post<FormData>(this.url+"/upload",file);
  }

  updateFile(id:string,file:any):Observable<any>{
    return this.http.put(this.url+"/update/"+id,file);
  }

  deleteFile(id:string):Observable<any>{
    return this.http.delete(this.url+"/delete/"+id);
  }


  shareContent(content: any):Observable<any>{
    return this.http.post<any>(this.url+"/share_content",content);
  }

  createAlbum(name: any):Observable<any>{
    return this.http.post<any>(this.url+"/create-album",{"name":name});

  }

  inviteMember(email: any):Observable<any>{
    return this.http.get<any>(this.url+"/invite/" + email );

  }

  deleteSharedContent(id:string):Observable<any>{
    return this.http.delete(this.url+"/share_content/"+id);
  }

  getSharedContent(folder:string): Observable<any> {
    return this.http.get(this.url+"/shared/" + folder);
  }
  
  moveFile(data:any):Observable<any>{
    return this.http.put(this.url+"/move",data);
  }

  getSubfolders():Observable<any>{
    return this.http.get(this.url+"/subfolders/markic");
  }

  getSharedGallery():Observable<any>{
    return this.http.get(this.url+"/shared_gallery");
  }


  
}


export interface ShareContent{
  filepath: string,
  sharedWith: string
  

}

export interface Content {
  content: Blob;
  fileName: string;
  fileType: string;
  fileSize: string;
  desc: string;
  tags: string;
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


export interface SharedTable{
  id: string,
  filepath: string,
  sharedWith: string,
  username: string
}


