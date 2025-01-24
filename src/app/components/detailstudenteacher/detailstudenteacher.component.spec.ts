import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstudenteacherComponent } from './detailstudenteacher.component';

describe('DetailstudenteacherComponent', () => {
  let component: DetailstudenteacherComponent;
  let fixture: ComponentFixture<DetailstudenteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailstudenteacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailstudenteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
