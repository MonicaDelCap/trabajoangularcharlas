import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  itemsStudent = [
    {
      routeLink: 'teacherProfile',
      icon: 'fal fa-regular fa-user',
      label: 'Perfil'
    },
    {
      routeLink: 'courses',
      icon: 'fal fa-solid fa-chalkboard-user',
      label: 'Cursos'
    },
   
    {
      routeLink: '/',
      icon: 'fal fa-sign-out-alt',
      label: 'Cerrar Sesion',
    }

  ]

  toggleCollapse(): void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed())
  }
  closeSidenav():void{
    this.changeIsLeftSidebarCollapsed.emit(true)

  }
}
