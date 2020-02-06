import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../interfaces/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  private items: IItem[];

  loadAllItems() {
    return this.http.get<IItem[]>(`${environment.API}/store`);
  }

  selectItems(items: IItem[]){
    this.items = items;
  }

  get allItems() {
    return this.items;
  }


}
  
