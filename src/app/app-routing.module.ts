import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path:"register", component: RegisterComponent
  },
  {
    path: "studentround", component:RondasstudentComponent
  },
  {
    path: "profile", component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
