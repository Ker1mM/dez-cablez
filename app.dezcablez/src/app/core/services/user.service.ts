import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { IValidCreate } from 'src/app/shared/interfaces/validResponse';
import { IAddress } from 'src/app/store/interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<IUser>(`${environment.API}/user/info`);
  }

  addUserAddress(address: IAddress) {
    return this.http.post<IValidCreate>(`${environment.API}/user/address/add`, address);
  }

  getUserAddresses() {
    return this.http.get<IAddress[]>(`${environment.API}/user/address/all`);
  }
}
