import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService, private _Router: Router, private toastr: ToastrService) { }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required], this.passwordsMatchValidator.bind(this)),
  });

  async passwordsMatchValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const password = this.registerForm.get('password')?.value;
    const rePassword = control.value;

    if (password !== rePassword) {
      return { passwordsNotMatch: true };
    }

    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signUp(this.registerForm.value).subscribe(
        {
          next: (res) => {
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Registration failed.', "");

          },
          complete: () => {
            this.isLoading = false;
            this.toastr.success('You have been successfully registered!', "");
            this._Router.navigate(["/login"])

          }
        }
      );
    }
  }
}