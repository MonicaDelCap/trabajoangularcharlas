import { Component, input, OnInit, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RondasstudentComponent } from '../rondasstudent/rondasstudent.component';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';

@Component({
  selector: 'app-menubarstudent',
  templateUrl: './menubarstudent.component.html',
  styleUrl: './menubarstudent.component.css'
})
export class MenubarstudentComponent implements OnInit {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  roundsArray!:Array<Round>;
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

  constructor(private _serviceRound:ServiceRound){}
  ngOnInit(): void {
    this._serviceRound.getRounds().then(r => {
      this.roundsArray = r
    })
  }

  toggleCollapse(): void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed())
  }
  closeSidenav():void{
    this.changeIsLeftSidebarCollapsed.emit(true)

  }

  
}
