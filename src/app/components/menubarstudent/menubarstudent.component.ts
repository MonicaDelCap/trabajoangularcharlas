import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RondasstudentComponent } from '../rondasstudent/rondasstudent.component';

@Component({
  selector: 'app-menubarstudent',
  templateUrl: './menubarstudent.component.html',
  styleUrl: './menubarstudent.component.css'
})
export class MenubarstudentComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  itemsStudent = [
    {
      routeLink: 'studentround',
      icon: 'fal fa-home',
      label: 'Inicio'
    },
    {
      routeLink: 'studentround',
      icon: 'fal fa-home',
      label: 'Charlas'
    },
    {
      routeLink: 'studentround',
      icon: 'fal fa-home',
      label: 'Rondas'
    },
    {
      routeLink: 'profile',
      icon: 'fal fa-home',
      label: 'Perfil'
    }

  ]

  toggleCollapse(): void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed())
  }
  closeSidenav():void{
    this.changeIsLeftSidebarCollapsed.emit(true)

  }
}
