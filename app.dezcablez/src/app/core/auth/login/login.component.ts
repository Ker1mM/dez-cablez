import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
        this.authService.login(val.username, val.password)
            .subscribe(
                (data) => {
                  console.log(data);
                    console.log("User is logged in");
                   // this.router.navigateByUrl('/');
                }
            );
    }

}
}
