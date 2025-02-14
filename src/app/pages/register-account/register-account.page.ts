import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register-account',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './register-account.page.html',
  styleUrls: ['./register-account.page.scss'],
})
export class RegisterAccountPage {
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    gender: '',
    agreeTerms: false
  };

  showPasswordBox: boolean = false;
  showPassword: boolean = false;

  passwordValid = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  };

  constructor(private router: Router) {}  

  ngAfterViewInit() {
    setTimeout(() => {
      const passwordBox = document.querySelector(".password-box") as HTMLElement;
      if (passwordBox) {
        passwordBox.style.top = "210px";
      }
    }, 1000); 
  }
  
  checkPasswordStrength() {
    const password = this.user.password;
    this.passwordValid.length = password.length >= 11;
    this.passwordValid.uppercase = /[A-Z]/.test(password);
    this.passwordValid.lowercase = /[a-z]/.test(password);
    this.passwordValid.number = /[0-9]/.test(password);
    this.passwordValid.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  togglePasswordVisibility() {
    const passwordField = document.getElementById("password-field") as HTMLInputElement;
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordField && eyeIcon instanceof SVGElement) {
      this.showPassword = !this.showPassword;
      passwordField.type = this.showPassword ? "text" : "password";
      eyeIcon.setAttribute("fill", this.showPassword ? "#ED7446" : "#777");
    }
  }

  hidePasswordBox() {
    setTimeout(() => {
      this.showPasswordBox = false;
    }, 200);
  }

  navigateToNextPage() {
    if (this.isPasswordStrong()) {
      this.router.navigate(['/next-page']);
    }
  }

  navigateToPrevious() {
    this.router.navigate(['/register-gym']);
  }

  isPasswordStrong(): boolean {
    return Object.values(this.passwordValid).every(Boolean);
  }
}
