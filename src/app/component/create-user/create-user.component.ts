import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  @Output() createUserSubmitted = new EventEmitter<User>();

  // userService = inject(UserService);

  createUserForm = new FormGroup({
    username: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    firstname: new FormControl(),
    familyname: new FormControl(),
    password: new FormControl('',{
      nonNullable:true,
      validators:[Validators.required, Validators.minLength(5)]
    }),
    birthday: new FormControl()
  });

  c = this.createUserForm.controls;

  isInvalid(control: FormControl){
    return control.invalid && (control.touched||control.dirty);
  }

  hasError(control:FormControl, errorCode:'email'|'required'|'minlength'){
    return control.hasError(errorCode) && control.touched;
  }

  createUser(){
    const newUser: User = {
      ...this.createUserForm.getRawValue(),
      token: '',
      role: []
    };
    this.createUserSubmitted.emit(newUser);
    console.log('CreateUserComponent', 'Finish create new User:', newUser);
    this.createUserForm.reset();
  }
}
