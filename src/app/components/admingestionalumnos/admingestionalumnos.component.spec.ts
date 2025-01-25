import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingestionalumnosComponent } from './admingestionalumnos.component';

describe('AdmingestionalumnosComponent', () => {
  let component: AdmingestionalumnosComponent;
  let fixture: ComponentFixture<AdmingestionalumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmingestionalumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmingestionalumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
