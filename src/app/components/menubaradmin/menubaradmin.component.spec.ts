import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubaradminComponent } from './menubaradmin.component';

describe('MenubaradminComponent', () => {
  let component: MenubaradminComponent;
  let fixture: ComponentFixture<MenubaradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenubaradminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
