import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-cardstudent',
  templateUrl: './cardstudent.component.html',
  styleUrl: './cardstudent.component.css'
})
export class CardstudentComponent{

  @Input() student!: Student

  
}
