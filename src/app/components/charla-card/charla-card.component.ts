import { Component, Input } from '@angular/core';
import { Charla } from '../../models/charla';

@Component({
  selector: 'app-charla-card',
  templateUrl: './charla-card.component.html',
  styleUrl: './charla-card.component.css'
})
export class CharlaCardComponent {
  @Input() charla!: Charla; 
  
}
