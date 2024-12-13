import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RondasstudentComponent } from './rondasstudent.component';

describe('RondasstudentComponent', () => {
  let component: RondasstudentComponent;
  let fixture: ComponentFixture<RondasstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RondasstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RondasstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
