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
      routeLink: 'profile',
      icon: 'fal fa-user',
      label: 'Perfil',
    },
    {
      routeLink: 'talks',
      icon: 'fal fa-comments',
      label: 'Charlas',
    },
  ];

  

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }
  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
