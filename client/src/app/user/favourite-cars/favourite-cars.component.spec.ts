import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCarsComponent } from './favourite-cars.component';

describe('FavouriteCarsComponent', () => {
  let component: FavouriteCarsComponent;
  let fixture: ComponentFixture<FavouriteCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteCarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
