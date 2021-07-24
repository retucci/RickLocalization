/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RickComponent } from './rick.component';

describe('RickComponent', () => {
  let component: RickComponent;
  let fixture: ComponentFixture<RickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
