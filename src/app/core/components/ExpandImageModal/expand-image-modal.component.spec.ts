/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExpandImageModal } from './expand-image-modal.component';

describe('ExpandImageModal', () => {
  let component: ExpandImageModal;
  let fixture: ComponentFixture<ExpandImageModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandImageModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandImageModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
