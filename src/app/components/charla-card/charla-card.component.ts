import { Component, Input, OnInit } from '@angular/core';
import { Charla } from '../../models/charla';
import { TalksByCourse } from '../../models/talks';

@Component({
  selector: 'app-charla-card',
  templateUrl: './charla-card.component.html',
  styleUrl: './charla-card.component.css'
})
export class CharlaCardComponent implements OnInit {
  @Input() charla!: Charla; 
  @Input() state!: string;

  ngOnInit(): void {
    console.log(this.charla.idCurso)
  }
}
