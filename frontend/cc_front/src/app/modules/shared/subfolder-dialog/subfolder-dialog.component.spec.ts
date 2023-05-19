import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfolderDialogComponent } from './subfolder-dialog.component';

describe('SubfolderDialogComponent', () => {
  let component: SubfolderDialogComponent;
  let fixture: ComponentFixture<SubfolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubfolderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubfolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
