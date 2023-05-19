import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSharedFolderComponent } from './view-shared-folder.component';

describe('ViewSharedFolderComponent', () => {
  let component: ViewSharedFolderComponent;
  let fixture: ComponentFixture<ViewSharedFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSharedFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSharedFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
