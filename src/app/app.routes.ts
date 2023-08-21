import { Routes } from '@angular/router';
import {CreateUserComponent} from "./component/create-user/create-user.component";
import {AdministratorComponent} from "./component/administrator/administrator.component";
import {LoginComponent} from "./component/login/login.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdministratorComponent}
];
