import {Routes} from '@angular/router';
import {CreateUserComponent} from "./component/create-user/create-user.component";
import {AdministratorComponent} from "./component/administrator/administrator.component";
import {LoginComponent} from "./component/login/login.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ShowUsersComponent} from "./component/show-users/show-users.component";


export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: CreateUserComponent},
  {path: 'show-users', component: ShowUsersComponent},
  {path: 'admin', component: AdministratorComponent}
];
