import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsstudentadminComponent } from './detailsstudentadmin.component';

describe('DetailsstudentadminComponent', () => {
  let component: DetailsstudentadminComponent;
  let fixture: ComponentFixture<DetailsstudentadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsstudentadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsstudentadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
