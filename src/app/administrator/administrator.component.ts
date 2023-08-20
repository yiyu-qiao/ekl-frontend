import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateUserComponent} from "../component/create-user/create-user.component";
import {UserService} from "../service/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [CommonModule,CreateUserComponent],
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {

  userService = inject(UserService);

  createUser: User|undefined;

  createNewUser(user: User){
    this.userService.saveNewUser(user).subscribe(savedUser => this.createUser);
  }

}
