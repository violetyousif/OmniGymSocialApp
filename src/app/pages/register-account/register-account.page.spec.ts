import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAccountPage } from './register-account.page';

describe('RegisterAccountPage', () => {
  let component: RegisterAccountPage;
  let fixture: ComponentFixture<RegisterAccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
