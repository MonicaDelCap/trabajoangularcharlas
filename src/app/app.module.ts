import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceUser } from './services/service.user';
import { MenubarComponent } from './components/menubar/menubar.component';
import { MenubarstudentComponent } from './components/menubarstudent/menubarstudent.component';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ServiceRound } from './services/service.round';
import { ProfileComponent } from './components/profile/profile.component';
import { CharlascardcomponentComponent } from './components/charlascardcomponent/charlascardcomponent.component';
import { ServiceTalks } from './services/service.talks';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';


import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './components/login/login.component';


// Registra la localización española
registerLocaleData(localeEs);
import { ServicePostFiles } from './services/service.postfiles';
import { CharlasComponent } from './components/charlas/charlas.component';
import { CharlaComponent } from './components/charla/charla.component';
import { CreateTalkComponent } from './components/create-talk/create-talk.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursewithstudentComponent } from './components/coursewithstudent/coursewithstudent.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardcourseComponent } from './components/cardcourse/cardcourse.component';
import { CardstudentComponent } from './components/cardstudent/cardstudent.component';
import { UpdateroundComponent } from './components/updateround/updateround.component';
import { CreateroundComponent } from './components/createround/createround.component';
import { UpdatecourseComponent } from './components/updatecourse/updatecourse.component';
import { CoursedetailsComponent } from './components/coursedetails/coursedetails.component';
import { CreatecourseComponent } from './components/createcourse/createcourse.component';
import { DetailstudenteacherComponent } from './components/detailstudenteacher/detailstudenteacher.component';


import { TeacherprofileComponent } from './components/teacherprofile/teacherprofile.component';

import { ServiceTeacher } from './services/serivece.teacher';
import { ServiceTeacherM } from './services/service.teacher';
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharlaCardComponent } from './components/charla-card/charla-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TeacherRondaComponent } from './components/teacher-ronda/teacher-ronda.component';
import { AdmingestionalumnosComponent } from './components/admingestionalumnos/admingestionalumnos.component';
import { CardroundteacherComponent } from './components/cardroundteacher/cardroundteacher.component';
import { PerfiladminComponent } from './components/perfiladmin/perfiladmin.component';
import { ServiceAdmin } from './services/service.admin';
import { MenubaradminComponent } from './components/menubaradmin/menubaradmin.component';
import { CourseswithstudentdisableComponent } from './components/courseswithstudentdisable/courseswithstudentdisable.component';



import { FullCalendarModule } from '@fullcalendar/angular';
import { CoursesadminComponent } from './components/coursesadmin/coursesadmin.component';
import { CardcourseadminComponent } from './components/cardcourseadmin/cardcourseadmin.component';
import { DetailsstudentadminComponent } from './components/detailsstudentadmin/detailsstudentadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    MenubarstudentComponent,
    RondasstudentComponent,
    ProfileComponent,
    CharlascardcomponentComponent,
    LoginComponent,
    CharlasComponent,
    CharlaComponent,
    CreateTalkComponent,
    CoursesComponent,
    CoursewithstudentComponent,
    CardcourseComponent,
    CardstudentComponent,
    UpdateroundComponent,
    CreateroundComponent,
    UpdatecourseComponent,
    CoursedetailsComponent,
    CreatecourseComponent,
    DetailstudenteacherComponent,
    TeacherprofileComponent,
    CharlaCardComponent,
    TeacherRondaComponent,
    MenubaradminComponent,
    AdmingestionalumnosComponent,
    CardroundteacherComponent,
    PerfiladminComponent,
    MenubaradminComponent,
    CourseswithstudentdisableComponent,
    CoursesadminComponent,
    CardcourseadminComponent,
    DetailsstudentadminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule, 
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide:DateAdapter,
      useFactory: adapterFactory
    }),
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    FullCalendarModule
  ],
  providers: [
    provideHttpClient(),
    ServiceUser, 
    ServiceRound,
    ServiceTalks,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    ServicePostFiles,
    ServiceTeacher,ServiceTeacherM,ServiceAdmin],
  bootstrap: [AppComponent],
  
})
export class AppModule { 

}
