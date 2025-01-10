import { Component, computed, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceUser } from './services/service.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'trabajoangularcharlas';
  isToken: boolean = false;
  idRole!: number;


  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  screenClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if(isLeftSidebarCollapsed){
      return ''
    }
    return this.screenWidth() > 768 ? 'body-trimmed': 'body-md-screen'
  })

  constructor(private _service:ServiceUser){}
  
  ngOnInit(): void {
    console.log("init")
    this._service.getProfile().then(r => this.idRole = r.usuario.idRole)
    if(localStorage.getItem('authToken')){
      this.isToken= true;
    }
  }

  ngDoCheck(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken && !this.isToken) {
      this.isToken = true;
      this._service.getProfile().then(r => this.idRole = r.usuario.idRole);
    } else if (!authToken && this.isToken) {
      this.isToken = false;
    }
  }
  

  @HostListener('window:resize')
  onResize(){
    this.screenWidth.set(window.innerWidth);
    if(this.screenWidth() < 768){
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean):void{
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
