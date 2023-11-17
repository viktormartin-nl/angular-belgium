/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotoSelectModal } from './photo-select-modal.component';

describe('PhotoSelectModal', () => {
  let component: PhotoSelectModal;
  let fixture: ComponentFixture<PhotoSelectModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSelectModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSelectModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
