import { Component, Input, OnInit } from '@angular/core';
import { Round } from '../../models/round';
import { DatePipe } from '@angular/common';
import { ServiceRound } from '../../services/service.round';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardround',
  templateUrl: './cardround.component.html',
  styleUrl: './cardround.component.css'
})
export class CardroundComponent implements OnInit{
  @Input() round!: Round;
  public dateExp !: string;

  constructor(
    private datePipe:DatePipe,
    private _serviceRound:ServiceRound,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.dateExp = this.convertDate(this.round.fechaCierre);
  }
  convertDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  deleteRound():void{
    this._serviceRound.deleteRoundById(this.round.idRonda)
    .then(r => this._router.navigate(["/courses"]) )
  }
}
