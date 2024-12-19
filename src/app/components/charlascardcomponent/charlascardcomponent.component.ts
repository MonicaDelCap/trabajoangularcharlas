import { Component, Input, OnInit } from '@angular/core';
import { Talks } from '../../models/talks';
import { ServiceTalks } from '../../services/service.talks';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-charlascardcomponent',
  templateUrl: './charlascardcomponent.component.html',
  styleUrl: './charlascardcomponent.component.css',
  providers: [DatePipe]
})
export class CharlascardcomponentComponent implements OnInit {

  @Input() idTalk!: Talks;
  fecha!: string;

  constructor(private datePipe: DatePipe){}

  ngOnInit(): void {
    this.fecha = this.datePipe.transform(this.idTalk.fechaPropuesta, 'dd - MMMM - yyyy')!;
  }
}
