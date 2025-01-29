import { Component, input, OnInit, output } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';

@Component({
  selector: 'app-menubaradmin',
  templateUrl: './menubaradmin.component.html',
  styleUrl: './menubaradmin.component.css'
})
export class MenubaradminComponent  {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  itemsStudent = [
    {
      routeLink: 'adminprofile',
      icon: 'fal fa-user',
      label: 'Perfil',
    },
    {
      routeLink: 'gestionusuarios',
      icon: 'fal fa-comments',
      label: 'Gestion Alumnos',
    },
  ];

  

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }
  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
