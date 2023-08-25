import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../model/user";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input({required:true})
  user: User|undefined;

  constructor() {
    console.log('UserDetailComponent.constructor:', this.user);

  }


}
