import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  showPassword: boolean = false;

  togglePasswordVisibility() {
    const passwordField = document.getElementById("password-field") as HTMLInputElement;
    const eyeIcon = document.getElementById("eye-icon");
  
    if (passwordField && eyeIcon instanceof SVGElement) {
      this.showPassword = !this.showPassword;
      passwordField.type = this.showPassword ? "text" : "password";
  
      
      eyeIcon.setAttribute("fill", this.showPassword ? "#ED7446" : "#777");
    }
  }
}
