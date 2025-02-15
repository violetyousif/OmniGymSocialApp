# OmniGymSocialApp
### Purpose:
An app to build a community for its gym members.

## MAIN PAGES

### Login Page:
1. Enter email
2. Enter password
   - Optional: Show password
3. Sign in button
   - Must be correct email
   - Must be correct password
   - Must check if membership status as active:
      - If TRUE: proceed with signing in.
      - If FALSE: reject with "Inactive Member. Did you move gyms? Submit ticket to check if your gym is affiliated and move profile."
         - Provide link on "Submit ticket"
5. Alternatively: register new account button

### Registration Page:
#### Page 1
_The following info will be used to search the gym's database using the gym name and the membership ID._ <br>
_If validated, user may proceed to page 2 of registration. Otherwise, throw error "Invalid Credentials"._
1. State
2. Gym name (converts to an abbreviation)
   - i.e.: LA Fitness = LAF, Lifetime = LF, Crunch Fitness = CF, Planet Fitness = PF
3. Gym city location
4. Membership ID from the gym

#### Page 2
_All the following info is required to successfully register or else an error is thrown_
1. Email
2. Password:
   - _Hashed password implementation to prevent security concerns with user inputs_
   - 10 Character minimum
   - Must have special characters.
   - Must include uppercase
   - Must include lowercase
   - Must include number
4. First Name
5. Last Name
6. Birthdate
   - Must be 18+ to create account
7. Phone Number
8. Accept terms (checkmark box)
   - User must agree to terms to proceed

### Main App Features:
1. Leaderboards: _Promotes engagement between gym members and fitness motivation._
     - Submit PRs and proof (image + video evidence) to leaderboard for review
          - Will have separate female and male leaderboard PRs:
             - Sumo Deadlifting
             - Conventional Deadlifting
             - Running Time Average
             - Bench press
             - Squat
          - Implement weight classes or a mathematical ratio of              
          - _Optional: Gym's can incentivize competition by applying a credit amount for winner(s) for that month_
     - Create personalized competitions amongst friends
     - Archived leaderboards
2. Workout plans
     - Share plans with others
     - Create plans
        - "Add exercise" button
        - Gif demonstrations
        - Title of workout routine
           - i.e.: "Back and Bi's", "Upperbody", "Legs", "Glutes"
        - _Optional:_ set days of the week (Su,M,T,W,Th,F,S) or exact dates (02/23/2025)
        - _Optional:_ set up expected number of:
           - reps
           - sets
           - weight
           - time
     - View plans
        - Optional inputs to allow information to be tracked and filled out
           - i.e.: actual completed reps, sets, and weight used, timing for cardio
4. Inbox
     - Messaging between members
5. User profiles
     - Public or private option
     - General Info
          - Name
          - Fitness Goal
          - Home gym location
          - Gym membership joined date
     - Current PR song
     - Progress pictures (have an option to add a "check-in" picture)
     - Metrics profile
     - Workout Highlights
     - Leaderboard trophies
6. Settings
     - Decide if profile is public or private
     - Change/update metrics
7. Events
     - Local events (i.e. Spartan race, fitness competitions)
     - Gym location events (i.e. Daddy daughter dances, V-Day dance, pickleball match)
     - Gym approved clubs
        - Terms and conditions
        - Check-ins
8. Support
     - Feedback form
     - Technical help (includes contact info)
     - Account help (e.g.: If user changes gyms, they can submit a ticket to change gyms in account)


## INSTRUCTIONS:
<br><br>
# Setting up the environment
Download the github repo and open it in the VSCode (or your preferred IDE).
In the terminal, enter the following command:
cd fullstack

Reference: https://ionicframework.com/docs/intro/environment

##Installing Ionic Framework on Your System

###Step 1: Install Node.js and npm
Ionic requires Node.js and npm (Node Package Manager) to be installed. To check if they are already installed, run:

node -v
npm -v
If Node.js is not installed, download and install it from Node.js official website.

Alternatively, you can install it using a package manager:

macOS (Homebrew)
brew install node
Linux (Ubuntu/Debian)
sudo apt update && sudo apt install -y nodejs npm
Windows Download the installer from Node.js official website and follow the installation instructions.

###Step 2: Install Ionic CLI and Angular CLI
Install the Ionic CLI and Angular CLI globally:

npm install -g @ionic/cli @angular/cli

Verify installation:

ionic -v
ng version

###Step 3: Install Cordova and Capacitor (For Native Mobile Development)
To build Android and iOS apps, install Cordova (optional) and Capacitor (required):

npm install -g cordova
npm install -g @capacitor/cli
Verify installation:

cordova -v
npx cap --version

###Step 4: Create a New Ionic Project
Navigate to your desired directory and create a new Ionic project:

ionic start myApp blank
You will be prompted to choose a framework. Select React, Angular, or Vue, based on your preference.

Example for Angular:

ionic start myApp blank --type=angular
Example for React:

ionic start myApp blank --type=react
###Step 5: Navigate to the Project Folder
cd myApp
###Step 6: Serve the Ionic App
Run the following command to launch the development server:

ionic serve
This will open the app in your default web browser.

<br><br><br><br>


## DATA COLLECTION
### Data Collected From User Registration (frontend):
**During Registration:**
1. State
2. Gym name (converts to an abbreviation)
   - e.g.: LA Fitness = LAF, Lifetime = LF, Crunch Fitness = CF, Planet Fitness = PF
4. Gym location
5. Gym membership ID
6. Email
7. Password
8. First Name
9. Last Name
10. Gender (m/f/other)
11. Birthdate
12. Phone Number

**User Metrics (optional):**
  1. Height
  2. Weight
  3. Fitness Goal (string)
  4. Display Trophies (yes/no)
  5. Deadlift PR:
     - Weight(lbs or kg)
     - reps (max 10)
  7. Bench PR:
     - Weight(lbs or kg)
     - reps (max 10)
  8. Squats PR:
     - Weight(lbs or kg)
     - reps (max 10)
  10. running time PR: time & distance
  11. Wilk's Score
      - Only if all 3 options for lifting PR's are filled out with weight and reps
      - Lifting coefficients: Wilk's score https://strengthlevel.com/wilks-calculator#wilksScoreResults

**Note:** <br>
[Lift Weight + reps] or [time + dist] for PR exercises is necessary when calculating their scores with coefficient formulas.<br>
Gender and user's weight is also necessary, so "other" or NULL should result in an error.


### Database Tables to Store Data (backend):
**[GymName]Members**:
_Example: "LifetimeMembers"_ <br>
_During registration, user will be validated using affiliated gym name and member_id_ <br>
_Data will be provided by each gym and each gym will have their own table._ <br>
   1. state_loc
   2. gym_name
   3. city_loc (maybe zipcode?)
   4. member_id (unique)
   5. active_accnt (boolean: TRUE or FALSE)

**OmnigymAccounts** (only for successful registrations):
  1. user_id (unique)
     - Gym abbreviation + membership ID (concat the two = Unique ID)
  2. email
  3. password
  4. gym_name
  5. member_id
  6. city_loc
  7. first_name
  8. last_name
  9. gender (m/f/other)
  10. birth_date
  11. phone_num
  12. active_accnt (boolean: TRUE or FALSE)
      - This column will allow us to save user data if they ever leave gym or switch)

**User Metrics Database**<br>
_Project Requirement: user should be able to edit, delete, and add/update info_ <br>
_All info is optional here, so allow NULL_ 
  1. user_id (from OmnigymAccount)
  2. gender (from OmnigymAccount)
  3. height
  4. weight
  5. gym_goal
  6. trophies
  7. deadlift_weight
  8. deadlift_reps
  9. bench_weight
  10. bench_reps
  11. squats_weight
  12. squats_reps
  13. running_time
  14. running_dist

