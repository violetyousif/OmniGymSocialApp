import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterGymPage } from './register-gym.page';

describe('RegisterGymPage', () => {
  let component: RegisterGymPage;
  let fixture: ComponentFixture<RegisterGymPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGymPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
