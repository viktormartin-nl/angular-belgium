import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPopupComponent } from './deleted-popup.component';

describe('DeletedPopupComponent', () => {
  let component: DeletedPopupComponent;
  let fixture: ComponentFixture<DeletedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
