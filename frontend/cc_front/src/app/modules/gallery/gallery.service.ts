import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }
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

