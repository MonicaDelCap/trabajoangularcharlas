import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CharlascardcomponentComponent } from './components/charlascardcomponent/charlascardcomponent.component';
import { LoginComponent } from './components/login/login.component';
import { CharlasComponent } from './components/charlas/charlas.component';
import { CharlaComponent } from './components/charla/charla.component';
import { CreateTalkComponent } from './components/create-talk/create-talk.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursewithstudentComponent } from './components/coursewithstudent/coursewithstudent.component';
import { UpdateroundComponent } from './components/updateround/updateround.component';
import { CreateroundComponent } from './components/createround/createround.component';
import { UpdatecourseComponent } from './components/updatecourse/updatecourse.component';
import { CoursedetailsComponent } from './components/coursedetails/coursedetails.component';
import { CreatecourseComponent } from './components/createcourse/createcourse.component';

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
    path:"courses", component:CoursesComponent
  },
  {
    path:"studentslist/:idCourse" , component:CoursewithstudentComponent
  },
  {
    path: "updateround/:idround", component:UpdateroundComponent
  },
  {
    path:"createround", component:CreateroundComponent
  },
  {
    path:"updatecourse/:id", component:UpdatecourseComponent
  },
  {
    path:"coursedetails/:id", component:CoursedetailsComponent
  },
  {
    path:"createcourse", component:CreatecourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
