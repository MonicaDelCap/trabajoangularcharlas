import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlasComponent } from './charlas.component';

describe('CharlasComponent', () => {
  let component: CharlasComponent;
  let fixture: ComponentFixture<CharlasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharlasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
