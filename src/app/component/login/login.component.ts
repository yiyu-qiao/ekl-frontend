import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginRequest} from "../../model/login-request";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginUser: User|undefined;

  userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    })
  });

  c = this.loginForm.controls;
  isInvalid(control: FormControl){
    return control.invalid && (control.touched||control.dirty);
  }

  hasError(control:FormControl, errorCode:'email'|'required'|'minlength'){
    return control.hasError(errorCode) && control.touched;
  }

  login() {
    const loginRequest: LoginRequest = {
      ...this.loginForm.getRawValue()
    };
    this.userService.login(loginRequest).subscribe(user => {
      this.loginUser = user;
      console.log('LoginComponent.login:',this.loginUser);
      });
    this.loginForm.reset();
  }
}
