import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPopupComponent } from './creation-popup.component';

describe('CreationPopupComponent', () => {
  let component: CreationPopupComponent;
  let fixture: ComponentFixture<CreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
