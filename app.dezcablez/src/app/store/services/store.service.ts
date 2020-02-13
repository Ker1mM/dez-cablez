import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../interfaces/item';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }


  loadAllItems() {
    return this.http.get<IItem[]>(`${environment.API}/store`);
  }


}

