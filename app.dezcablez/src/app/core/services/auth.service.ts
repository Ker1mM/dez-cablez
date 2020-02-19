import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAuthToken } from '../interfaces/token';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<IAuthToken>(`${environment.API}/authentication/login`, { username, password })
      .pipe(tap(res => {
        this.setSession(res);
      }
      ));
  }

  register(username: string, email: string, password: string){
    return this.http.post(`${environment.API}/authentication/register`, {username, email, password});
  }

  private setSession(response: IAuthToken) {
    const expiresAt = moment().add(response.expiresIn, 'second');

    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_username', response.username);
    localStorage.setItem('auth_token_expiration_date', JSON.stringify(expiresAt.valueOf()))
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_token_expiration_date');
  }

  public isLoggedIn() {
    if (moment().isBefore(this.getExpiration())) {
      return true;
    }

    this.logout();
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('auth_token_expiration_date');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }



}

