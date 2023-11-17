/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotoFromFolderModal } from './photo-from-folder-modal.component';

describe('PhotoFromFolderModal', () => {
  let component: PhotoFromFolderModal;
  let fixture: ComponentFixture<PhotoFromFolderModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFromFolderModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFromFolderModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
