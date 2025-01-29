import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiladminComponent } from './perfiladmin.component';

describe('PerfiladminComponent', () => {
  let component: PerfiladminComponent;
  let fixture: ComponentFixture<PerfiladminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfiladminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfiladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
