# Omnigym Social App
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
```

----------------------------------------------------
-- ---------------- ALL GYMS: ----------------------
----------------------------------------------------
-- **PURPOSE: Gym support system
CREATE TABLE OmnigymSupport (
   ticketID INTEGER PRIMARY KEY AUTOINCREMENT,
   memberID TEXT NOT NULL,
   gymabbr VARCHAR(3) NOT NULL,
   category TEXT CHECK (category IN ('Feedback', 'Technical Help', 'Account Help')),
   description TEXT NOT NULL,
   status VARCHAR(15) CHECK (status IN ('Open', 'In Progress', 'Resolved')) DEFAULT 'Open',
);
-- **PURPOSE: Stores affiliated gyms and their details
CREATE TABLE affilGyms (
    gymID INTEGER PRIMARY KEY AUTOINCREMENT,
    gymAbbr VARCHAR(3) NOT NULL, -- Shortened gym name (LTF, CF, PF, etc.)
    gymName VARCHAR(20) NOT NULL,
    gymCity VARCHAR(20) NOT NULL,  -- Maybe map APIs? Might change to int value
    gymState VARCHAR(2) NOT NULL -- State/location would be necessary; excludes non-local locations or different owners
);

----------------------------------------------------
-- --------- GYM-SPECIFIC ADMIN ACCESS -------------
----------------------------------------------------
-- **PURPOSE: Gym-specific events; This will be viewed on events page for each gym-specific user
CREATE TABLE LTFEvents (
   eventID INTEGER PRIMARY KEY AUTOINCREMENT,
   gymCity VARCHAR(20),
   eventName VARCHAR(30) NOT NULL,
   eventDate VARCHAR(25),
   eventType VARCHAR(20) CHECK (eventType IN ('Local', 'Gym-Specific')),
   eventLocation VARCHAR(20) NOT NULL,
   uploadDate DATETIME DEFAULT CURRENT_DATE,
   FOREIGN KEY (gymCity) REFERENCES LTFUsers(gymCity)
);

-- **PURPOSE: Table uploading/updating current active members by admin
CREATE TABLE LifetimeFitnessDB (
   gymCity VARCHAR(20) NOT NULL,
   memberID VARCHAR(15) PRIMARY KEY, -- Gym Member ID
   lastName VARCHAR(20) NOT NULL,
   firstName VARCHAR(20) NOT NULL,
   uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP -- Date and time of last upload
);


----------------------------------------------------
-- ------------ GYM-SPECIFIC USERS: ----------------
----------------------------------------------------
-- During login, customers will need to be asked affiliated gym again to locate proper database
-- Then we won't need to have a separate accounts table to locate them each.

-- **PURPOSE: Each gym gets a separate table for its members (Example: Lifetime Fitness)
CREATE TABLE LTFUsers (
   userID INTEGER AUTOINCREMENT,
   memberID VARCHAR(15) UNIQUE PRIMARY KEY, -- Gym-provided unique membership ID
   gymAbbr VARCHAR(3) NOT NULL,
   gymCity VARCHAR(20) NOT NULL,	-- this is necessary to use for gym events table and leaderboard
   lastName VARCHAR(20) NOT NULL,  
   firstName VARCHAR(20) NOT NULL,
   email VARCHAR(30) UNIQUE NOT NULL,
   password VARCHAR(20) NOT NULL,
   dob VARCHAR(10) NOT NULL, -- Format: mm/dd/yyyy
   phoneNum VARCHAR(12) NOT NULL, -- "xxx-xxx-xxxx"; may change if input box only accepts integers OR backend removes non-integers
   gender VARCHAR(6) CHECK (gender IN ('Male', 'Female', 'Other')) NOT NULL,
   termsAccepted BOOLEAN DEFAULT FALSE,
   dateJoined DATE DEFAULT CURRENT_DATE,
   activeAccnt BOOLEAN DEFAULT TRUE -- Marks if user is active in their gym
);


-- **PURPOSE: Stores user settings per gym
CREATE TABLE LTFUserSettings (
   settingsID INTEGER AUTOINCREMENT,
   memberID VARCHAR(15) PRIMARY KEY,
   profilePublic BOOLEAN DEFAULT TRUE, -- Profile visibility
   caption VARCHAR(50), -- Optional user bio
   units VARCHAR(8) CHECK (units IN ('Metric', 'Imperial')) DEFAULT 'Imperial', -- Revisit this implementation in 3rd iteration
   fitnessGoal VARCHAR(30),
   age INTEGER,
   wilks2Score DOUBLE DEFAULT NULL, -- Wilks 2 Score calculated from PRs, age, reps, weight.
                                    -- Temp: We could link a site for this if we don't have time to implement it yet.
   prSong VARCHAR(50),
   trophies BOOLEAN DEFAULT TRUE, -- Display trophies
   FOREIGN KEY (memberID) REFERENCES LTFUsers(memberID)
);

-- **PURPOSE: Stores fitness metrics (can be used eventually for Wilks 2 score)
CREATE TABLE LTFMemMetrics (
   metricsID INTEGER AUTOINCREMENT,
   memberID VARCHAR(15),
   gender VARCHAR(6) CHECK (gender IN ('Male', 'Female')) NOT NULL,
   memberWeight DOUBLE,
   height DOUBLE,
   prBenchWeight DOUBLE,
   prBenchReps INTEGER,
   prDeadliftWeight DOUBLE,
   prDeadliftReps INTEGER,
   prSquatWeight DOUBLE,
   prSquatReps INTEGER,
   runningTime VARCHAR(8), -- Format: HH:MM:SS
   runningDist DOUBLE,
   FOREIGN KEY (memberID) REFERENCES LTFUsers(memberID)
);

-- **PURPOSE: Leaderboard for gym-specific competitions. Only approved submissions should be displayed on page.
CREATE TABLE LTFLeaderboard (
    leaderboardID INTEGER PRIMARY KEY AUTOINCREMENT,
    memberID VARCHAR(15),
    category VARCHAR(15) CHECK (category IN ('Deadlift', 'Bench Press', 'Squat', 'Running Time')),
    memberWeight DOUBLE,
    prWeight DOUBLE,
    prReps INTEGER CHECK (prReps BETWEEN 1 AND 10),
    submissionDate DATETIME DEFAULT CURRENT_DATE,
    proofVideo BLOB, -- Optional video proof
    approved BOOLEAN DEFAULT FALSE, -- Admin approval required for PRs
    FOREIGN KEY (memberID) REFERENCES LTFUsers(memberID)
);

-- PURPOSE: Stores archived winners 
CREATE TABLE LTFArchivedLeaderboards (
    leaderboardID INTEGER PRIMARY KEY AUTOINCREMENT,
    memberID VARCHAR(15),
    category VARCHAR(15) CHECK (category IN ('Deadlift', 'Bench Press', 'Squat', 'Running Time')),
    prWeight DOUBLE,
    prReps INTEGER,
    submissionDate TEXT,
    archivedDate DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (memberID) REFERENCES LTFUsers(memberID)
);

-- PURPOSE: Messaging system (Inbox) (research how to create inbox db)
CREATE TABLE LTFMessages (
   messageID INTEGER PRIMARY KEY AUTOINCREMENT,
   senderID TEXT NOT NULL,
   receiverID VARCHAR(20) NOT NULL,
   messageText TEXT NOT NULL,
   messageDate DATE DEFAULT CURRENT_DATE,
   FOREIGN KEY (senderID) REFERENCES LTFUsers(memberID),
   FOREIGN KEY (receiverID) REFERENCES LTFUsers(memberID)
);

-- PURPOSE: Stores workout plans
CREATE TABLE LTFWorkoutPlans (
    planID INTEGER PRIMARY KEY AUTOINCREMENT,
    memberID VARCHAR(15),
    title VARCHAR(15) NOT NULL, -- "Back & Bi's", "Upper Body", etc.
    dayOfWeek VARCHAR(7), 	-- Optional: (Su, M, T, W, Th, F, S)
    exactDate VARCHAR(10), 	-- Optional: YYYY-MM-DD
    FOREIGN KEY (memberID) REFERENCES LTFUsers(memberID)
);

-- PURPOSE: Stores exercises linked to a workout plan
CREATE TABLE LTFExercises (
   exerciseID INTEGER PRIMARY KEY AUTOINCREMENT,
   planID INTEGER NOT NULL,
   exerciseName VARCHAR(30) NOT NULL,
   sets INTEGER,	-- For lifting workouts
   reps INTEGER,	-- For lifting workouts
   weightAmnt DOUBLE,	-- For lifting workouts
   duration VARCHAR(8), -- For cardio workouts
   distance DOUBLE, -- For cardio workouts
   FOREIGN KEY (planID) REFERENCES LTFWorkoutPlans(planID)
);





----------------------------------------------------
-- -------------- NECESSARY FUNCTIONS --------------
----------------------------------------------------
-- **PURPOSE: If a member is found in the uploaded list, their account remains active.
UPDATE LTFUsers 
SET activeAccnt = TRUE
WHERE memberID IN (SELECT memberID FROM LifetimeFitnessDB);

-- **PURPOSE: If a member is missing from the new upload, their account is deactivated (FALSE).
UPDATE LTFUsers 
SET activeAccnt = FALSE 
WHERE memberID NOT IN (SELECT memberID FROM LifetimeFitnessDB);

-- **PURPOSE: Backend call when logging user in to verify they are active and credentials are accurate.
SELECT * FROM LTFUsers WHERE email LIKE ? AND password LIKE ? AND activeAccnt = TRUE;
```


