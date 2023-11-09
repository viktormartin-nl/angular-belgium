/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotoFromCameraModal } from './photo-from-camera-modal.component';

describe('PhotoFromCameraModal', () => {
  let component: PhotoFromCameraModal;
  let fixture: ComponentFixture<PhotoFromCameraModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFromCameraModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFromCameraModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
