import { Routes } from '@angular/router';
import {CreateUserComponent} from "./component/create-user/create-user.component";
import {AdministratorComponent} from "./administrator/administrator.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin'},
  {path: 'admin', component: AdministratorComponent}
];
