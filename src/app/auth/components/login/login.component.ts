import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading: boolean = false;

  errorMessage: string = "";
  constructor(private authService: AuthenticationService, private _Router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });



  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.loginForm.value).subscribe(
        {
          next: (res) => {
            localStorage.setItem("token", res.token)
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = "incorrect email or password";
          },
          complete: () => {
            this.isLoading = false;
            this.authService.isLogin.next(true);
            this._Router.navigate(["/admin/products"])
          }
        }
      );
    }
  }
}