import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '546c25a59c58ad7';
  private accessToken: string = '5fbd517ea213f85775ac3cc6ad0cb1ea6ce34ddf';


  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File, infoObject: any) {
    let formData = new FormData();
    formData.append('image', imageFile, infoObject.title);

    let header = new HttpHeaders({
      "authorization": 'Bearer ' + this.accessToken
    });

    return this.http.post(this.url, formData, { headers: header});
  }
}