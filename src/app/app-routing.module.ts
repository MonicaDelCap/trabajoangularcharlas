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
import { DetailstudenteacherComponent } from './components/detailstudenteacher/detailstudenteacher.component';
import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';
import { AdmingestionalumnosComponent } from './components/admingestionalumnos/admingestionalumnos.component';
import { TeacherRondaComponent } from './components/teacher-ronda/teacher-ronda.component';
import { PerfiladminComponent } from './components/perfiladmin/perfiladmin.component';
import { CourseswithstudentdisableComponent } from './components/courseswithstudentdisable/courseswithstudentdisable.component';

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
  },
  {
    path:"detailsstudent/:id/:state", component:DetailstudenteacherComponent
  },
  {
    path: "teacherProfile", component:TeacherprofileComponent
  },
  {
    path:"gestionusuarios", component:AdmingestionalumnosComponent
  },
  {
    path: "teacher/ronda/:idRonda/:idCurso", component:TeacherRondaComponent
  },
  {
    path: "teacher/ronda/:idRonda", component:TeacherRondaComponent
  },
  {
    path:'adminprofile',component:PerfiladminComponent
  },
  {
    path: 'studentslistdisable/:id', component:CourseswithstudentdisableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
