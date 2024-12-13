import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarstudentComponent } from './menubarstudent.component';

describe('MenubarstudentComponent', () => {
  let component: MenubarstudentComponent;
  let fixture: ComponentFixture<MenubarstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenubarstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubarstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
