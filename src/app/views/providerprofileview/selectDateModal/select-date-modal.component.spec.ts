/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectDateModal } from './select-date-modal.component';

describe('SelectDateModal', () => {
  let component: SelectDateModal;
  let fixture: ComponentFixture<SelectDateModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDateModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
