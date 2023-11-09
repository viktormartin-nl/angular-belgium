import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordErrorMessageComponent } from './password-error-message.component';

describe('PasswordErrorMessageComponent', () => {
  let component: PasswordErrorMessageComponent;
  let fixture: ComponentFixture<PasswordErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
