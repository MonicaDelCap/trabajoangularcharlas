import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardroundteacherComponent } from './cardroundteacher.component';

describe('CardroundteacherComponent', () => {
  let component: CardroundteacherComponent;
  let fixture: ComponentFixture<CardroundteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardroundteacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardroundteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
