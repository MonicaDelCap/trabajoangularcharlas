import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-cardstudent',
  templateUrl: './cardstudent.component.html',
  styleUrl: './cardstudent.component.css'
})
export class CardstudentComponent implements OnInit{

  @Input() student!: Student

  @Input() state!: string;

  ngOnInit(): void {
    console.log(this.state)
  }
  
  
}
