import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CharlascardcomponentComponent } from './components/charlascardcomponent/charlascardcomponent.component';
import { LoginComponent } from './components/login/login.component';
import { CharlasComponent } from './components/charlas/charlas.component';
import { CharlaComponent } from './components/charla/charla.component';
import { CreateTalkComponent } from './components/create-talk/create-talk.component';
import { PerfiladminComponent } from './components/perfiladmin/perfiladmin.component';

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
  },
  {
    path: "talks", component:CharlasComponent
  },
  { 
    path: 'talk/:id', component: CharlaComponent 
  },
  {
    path: 'createtalk/:id', component:CreateTalkComponent
  },
  {
    path:'adminprofile',component:PerfiladminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
