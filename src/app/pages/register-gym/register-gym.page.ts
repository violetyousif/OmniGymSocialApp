import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; 
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-register-gym',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule], 
  templateUrl: './register-gym.page.html',
  styleUrls: ['./register-gym.page.scss'],
})
export class RegisterGymPage {
  state: string = "";
  gym: string = "";
  membership: string = "";
  location: string = "";

  states: string[] = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  gyms: string[] = [
    "Planet Fitness", "LA Fitness", "Gold's Gym", "24 Hour Fitness", "Anytime Fitness",
    "Equinox", "Crunch Fitness", "Lifetime Fitness", "Orangetheory Fitness", "Snap Fitness",
    "YMCA",
  ];

  constructor(private router: Router) {} 

  submitForm(form: NgForm) {
    console.log("Submit button clicked!"); 
  
    if (!this.state || !this.gym || !this.membership) {
      console.log("Form is invalid. Please fill in required fields.");
      return; 
    }
  
    console.log("✅ Form is valid! Navigating to /register-account", {
      state: this.state,
      gym: this.gym,
      membership: this.membership,
      location: this.location,
    });
  
    this.router.navigateByUrl('/register-account'); 
  }
  
}
