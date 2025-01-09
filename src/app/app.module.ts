import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceUser } from './services/user.service';
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
@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    MenubarstudentComponent,
    RondasstudentComponent,
    ProfileComponent,
    CharlascardcomponentComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule, 
    MatButtonModule
  ],
  providers: [ServiceUser, ServiceRound,ServiceTalks,DatePipe,{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
  
})
export class AppModule { 
  
}
