import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailogComponent } from './add-dailog.component';

describe('AddDailogComponent', () => {
  let component: AddDailogComponent;
  let fixture: ComponentFixture<AddDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
