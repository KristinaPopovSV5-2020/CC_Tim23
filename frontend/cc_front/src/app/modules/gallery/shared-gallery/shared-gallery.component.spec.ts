import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGalleryComponent } from './shared-gallery.component';

describe('SharedGalleryComponent', () => {
  let component: SharedGalleryComponent;
  let fixture: ComponentFixture<SharedGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
