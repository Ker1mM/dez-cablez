import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.scss']
})
export class ProfileNavigationComponent implements OnInit {
  


  active: string;
  constructor(private authService: AuthService,
    private router: Router) { }


  ngOnInit() {
    this.active = 'profile';
  }

  activate(tab: string) {
    this.active = tab;
    if(this.authService.isLoggedOut()){
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
 