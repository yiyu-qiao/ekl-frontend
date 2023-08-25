import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {UserDetailComponent} from "../user-detail/user-detail.component";

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [CommonModule, UserDetailComponent],
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent {

  userService = inject(UserService);

  users: User[] = [];

  constructor(){
    this.userService.usersGet().subscribe(users => {
      this.users = users;
      console.log('ShowUserComponent.constructor:',this.users);
    });
  }
}
