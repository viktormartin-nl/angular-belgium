/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProviderProfileComponent } from './provider.component';

describe('ProviderProfileComponent', () => {
  let component: ProviderProfileComponent;
  let fixture: ComponentFixture<ProviderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
