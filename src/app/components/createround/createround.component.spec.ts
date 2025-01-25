import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateroundComponent } from './createround.component';

describe('CreateroundComponent', () => {
  let component: CreateroundComponent;
  let fixture: ComponentFixture<CreateroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
