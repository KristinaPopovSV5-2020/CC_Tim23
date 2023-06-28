import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMemberComponent } from './verify-member.component';

describe('VerifyMemberComponent', () => {
  let component: VerifyMemberComponent;
  let fixture: ComponentFixture<VerifyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
