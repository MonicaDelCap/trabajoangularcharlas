import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateroundComponent } from './updateround.component';

describe('UpdateroundComponent', () => {
  let component: UpdateroundComponent;
  let fixture: ComponentFixture<UpdateroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
