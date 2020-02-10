import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  savedUsername: string;
  submitted = false;
  errorMessage: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; } //easy access to fields

  handleSubmit() {
    this.submitted = true;

    console.log('click')
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (data) => {
          this.router.navigate(['']);
        }, error => {
          this.savedUsername = this.loginForm.value.username;
          if (error.status === 400) {
            this.f.username.setErrors({ unauthorized: true });
          }
          this.f.password.reset();
          this.submitted = false;
        }
      );
  }
}
