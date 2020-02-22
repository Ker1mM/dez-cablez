import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '546c25a59c58ad7';
  private accessToken: string = '9d61e814bc8df5e1872e156bc6524c305b40d8ff';


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