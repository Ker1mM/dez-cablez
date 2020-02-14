import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { state } from '@angular/animations';

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
  return: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
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
          this.router.navigateByUrl(this.return);
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
