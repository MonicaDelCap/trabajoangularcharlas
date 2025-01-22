import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlaCardComponent } from './charla-card.component';

describe('CharlaCardComponent', () => {
  let component: CharlaCardComponent;
  let fixture: ComponentFixture<CharlaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharlaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharlaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
