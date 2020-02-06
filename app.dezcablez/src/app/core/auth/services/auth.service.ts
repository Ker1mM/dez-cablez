import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthToken } from '../interfaces/token';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
    
  login(username:string, password:string ) {
      return this.http.post<AuthToken>(`${environment.API}/Authentication/login`, {username, password})
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(response : AuthToken){
    const expiresAt = moment().add(response.expirationDate,'second');

    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_token_expiration_date', JSON.stringify(expiresAt.valueOf()) )
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_expiration_date');
  }

   public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
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
  
  