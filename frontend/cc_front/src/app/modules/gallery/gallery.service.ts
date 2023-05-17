import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
  }

  loadGallery(): Observable<any> {
    return this.http.get("https://1f414q2rnh.execute-api.eu-north-1.amazonaws.com/prod/gallery",);
  }

  loadAlbum(album:string): Observable<any> {
    return this.http.get("https://1f414q2rnh.execute-api.eu-north-1.amazonaws.com/prod/gallery/" + album,);
  }

  uploadFile(file:Content): Observable<any> {
    return this.http.post<any>("https://1f414q2rnh.execute-api.eu-north-1.amazonaws.com/prod/upload",file);
  }
}

export interface Content {
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

