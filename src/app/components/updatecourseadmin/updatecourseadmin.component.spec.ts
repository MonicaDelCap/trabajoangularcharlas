import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecourseadminComponent } from './updatecourseadmin.component';

describe('UpdatecourseadminComponent', () => {
  let component: UpdatecourseadminComponent;
  let fixture: ComponentFixture<UpdatecourseadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatecourseadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecourseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
