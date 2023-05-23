import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSharedContentComponent } from './view-shared-content.component';

describe('ViewSharedContentComponent', () => {
  let component: ViewSharedContentComponent;
  let fixture: ComponentFixture<ViewSharedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSharedContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSharedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
