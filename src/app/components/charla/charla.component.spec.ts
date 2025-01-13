import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlaComponent } from './charla.component';

describe('CharlaComponent', () => {
  let component: CharlaComponent;
  let fixture: ComponentFixture<CharlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharlaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
