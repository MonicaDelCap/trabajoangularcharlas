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
      routeLink: 'courses',
      icon: 'fal fa-home',
      label: 'Cursos'
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
