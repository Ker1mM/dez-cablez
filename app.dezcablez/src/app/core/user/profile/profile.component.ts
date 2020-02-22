import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<IUser>;

  editForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.user$ = this.userService.getUserInfo();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



}
