import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    })
  });

  c = this.loginForm.controls;

  hasError(control: FormControl, errorCode: 'email' | 'required' | 'minlength') {
    return control.hasError(errorCode) && control.touched;
  }

  loginWithCredentials() {
    const { username, password } = this.loginForm.getRawValue();
    this.authService.loginWithCredentials(username, password).subscribe();
  }

  loginWithCertificate() {
    this.authService.loginWithCertificate();
  }

  loginWithOAuth2() {
    this.authService.loginWithOAuth2();
  }
}
