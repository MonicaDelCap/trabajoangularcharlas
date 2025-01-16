import { Component } from '@angular/core';

@Component({
  selector: 'app-coursewithstudent',
  templateUrl: './coursewithstudent.component.html',
  styleUrl: './coursewithstudent.component.css'
})
export class CoursewithstudentComponent {

  isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
