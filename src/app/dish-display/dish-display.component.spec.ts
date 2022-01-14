import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDisplayComponent } from './dish-display.component';

describe('DishDisplayComponent', () => {
  let component: DishDisplayComponent;
  let fixture: ComponentFixture<DishDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
