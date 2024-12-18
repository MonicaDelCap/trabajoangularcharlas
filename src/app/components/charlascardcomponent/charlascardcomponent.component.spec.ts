import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlascardcomponentComponent } from './charlascardcomponent.component';

describe('CharlascardcomponentComponent', () => {
  let component: CharlascardcomponentComponent;
  let fixture: ComponentFixture<CharlascardcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharlascardcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharlascardcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
