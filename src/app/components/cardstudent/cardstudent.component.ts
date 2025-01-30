import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cardstudent',
  templateUrl: './cardstudent.component.html',
  styleUrl: './cardstudent.component.css'
})
export class CardstudentComponent implements OnInit{

  @Input() student!: Student

  @Input() state!: string;
  public role !: number |null ;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
        this.role = role ? parseInt(role, 10) : 0;
    
  }
  
  
}
