import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

  navigateToNextPage() {
    if (this.isFormValid()) {
      this.router.navigate(['/next-page']);
    }
  }

  navigateToPrevious() {
    this.router.navigate(['/register-gym']);
  }

  isFormValid(): boolean {
    return (
      this.user.firstName.trim() !== '' && 
      this.user.lastName.trim() !== '' && 
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.birthDate !== '' &&
      this.user.phone.trim() !== '' &&
      this.user.gender !== '' &&
      this.user.agreeTerms
    );
  }
    // Function to handle submission
    submitForm() {
      if (this.isFormValid()) {
        console.log("Form submitted:", this.user);
      } else {
        console.log("Form is incomplete!");
    }
  }
}
