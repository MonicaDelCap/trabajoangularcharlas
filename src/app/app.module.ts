import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ServiceUser } from './services/user.service';
import { MenubarComponent } from './components/menubar/menubar.component';
import { MenubarstudentComponent } from './components/menubarstudent/menubarstudent.component';
import { RondasstudentComponent } from './components/rondasstudent/rondasstudent.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ServiceRound } from './services/service.round';
import { ProfileComponent } from './components/profile/profile.component';
import { ServiceCharla } from './services/charla.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenubarComponent,
    MenubarstudentComponent,
    RondasstudentComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule, 
    MatButtonModule
  ],
  providers: [ServiceUser, ServiceRound,ServiceCharla],
  bootstrap: [AppComponent],
  
})
export class AppModule { 
  
}
