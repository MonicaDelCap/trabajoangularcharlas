import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CharlascardcomponentComponent } from './components/charlascardcomponent/charlascardcomponent.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "studentround/:id", component:RondasstudentComponent
  },
  {
    path: "profile", component:ProfileComponent
  },
  {
    path:"charlas", component:CharlascardcomponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
