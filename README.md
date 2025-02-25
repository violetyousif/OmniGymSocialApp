# OmniGymSocialApp
### Purpose:
An app to build a community for its gym members.

## WEBSITE LINK
**To preview website intro in HTML pages:**
1. Navigate to the _omnigymWebsite_ folder
2. Right click _iterations1.html_ or _Omni2.html_ depending on purpose.
   - _Iterations1.html_ will link the iterations to the github and has a tab for the "App Home" (_Omni2.html_). Since the app is mobile-based, we were unable to link the file type directly to the tabs.

   - _Omni2.html_ is the omnigym intro site and will describe omnigym's purpose. (Refer to footnote for terms.)
<br><br>

## SETUP INSTRUCTIONS
This guide will help you download the project, install dependencies, and run the app using Ionic with React. You can compile and view the app on web, Android, and iOS simulators.

## Installing OmniGymSocialApp Project
To begin, you will download the github repo and open it in the VSCode or your preferred code editor.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/OmniGymSocialApp.git
   cd OmniGymSocialApp
   ```

2. **Set Up the Backend**
   - Navigate to the backend directory:
     ```bash
     cd Fullstack/Backend
     ```
   - Create a virtual environment (optional but recommended):
     ```bash
     python3 -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```

3. **Ionic with React Setup Guide**

## Prerequisites

Before getting started with frontend, please ensure you have the following installed:

- **Node.js and npm**  
  Verify installation:<br>
  ```
  node --version
  npm --version
  ```

If not installed, download from [nodejs.org](https://nodejs.org/en).

- **Ionic Cli** <br>
   Install the Ionic CLI globally: <br>
      ```
         npm install -g @ionic/cli
      ```
   <br><br>Verify installation:<br>
      ```
         ionic --version
      ```

**Native Development Tools:**
- Android: Install [Android Studio](https://developer.android.com/studio) (ensure the Android SDK is installed).
- iOS (Mac only): Install [Xcode](https://developer.apple.com/xcode/) from the Mac App Store.

## App Setup
1. Download the Project if you haven't already.
   Clone the repository or download the ZIP file from GitHub. Then, open the project in your preferred code editor.

2. Navigate to the App directory:
   The main application code is located in the omnigym folder. Navigate to this folder:
      ```bash
      cd OmniGymSocialApp/omnigym
      ```
3. Install dependencies:
   Install the required packages by running:
      ```bash
      npm install
      ```

## Running the App
### Web Simulator
To compile and run the app in your web browser, use: <br>
      ```bash
      ionic serve
      ```
<br>This command will compile your project and automatically open it in your default browser.

### Preparing for Native Development (Android & iOS)
The project uses Capacitor for native builds.
1. Build the Project
   Before adding any native platforms, ensure the project is built:
      ```bash
      ionic build
      ```
2. Add and Sync Native Platforms
   Android:
      ```bash
      ionic capacitor add android
      ionic capacitor copy android
      ionic capacitor open android
      ```
      The last command will open the Android project in Android Studio, where you can run the app on an emulator or device.
   iOS (Mac only):
      ```bash
      ionic capacitor add ios
      ionic capacitor copy ios
      ionic capacitor open ios
      ```
      The last command will open the iOS project in Xcode, where you can run the app on the iOS simulator or a connected device.

## Optional: Version Checks and Updates
- Verify Capacitor Version:<br>
      ```
      npx cap --version
      ```
  <br>
- Update Ionic CLI and Capacitor:<br>
      ```
      npm install -g @ionic/cli
      npm install @capacitor/core @capacitor/cli
      ```
  <br>
## Troubleshooting:
- Ensure your Node.js and npm versions meet the minimum requirements.
- Confirm that Android Studio and Xcode are correctly installed and configured.
- For further assistance, refer to the [Ionic Documentation](https://ionic.io/docs/appflow) and [Ionic Capacitor Documentation](https://ionicframework.com/docs/cli/commands/build).
<br><br><br><br>



# OMNIGYM APP PAGES
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
[Lift Weight + reps] or [time + dist] for PR exercises is necessary when calculating their Wilks 2 scores with the coefficient formulas.<br>
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
