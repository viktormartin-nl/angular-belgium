import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailErrorMessageComponent } from './email-error-message.component';

describe('EmailErrorMessageComponent', () => {
  let component: EmailErrorMessageComponent;
  let fixture: ComponentFixture<EmailErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
