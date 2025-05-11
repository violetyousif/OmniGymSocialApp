# Omnigym Social App
### Purpose:
An app to build a community for its gym members.

## WEBSITE LINK
**To preview website intro in HTML pages:**
1. Navigate to the _omnigymWebsite_ folder
2. Right click _iterations1.html_ or _Omni2.html_ depending on purpose.
   - _Iterations1.html_ will link the iterations to the github and has a tab for the "App Home" (_Omni2.html_). Since the app is mobile-based, we were unable to link the file type directly to the tabs.

   - _Omni2.html_ is the omnigym intro site and will describe omnigym's purpose. (Refer to footnote for terms.)

>Preview Overview and Video Demonstration [Here](https://youtu.be/OLkpUOrBD4s?si=bic9qn0tcaKdr27t)

<br><br>
---
<br>


# Setup Guide

This guide walks you through setting up the **Frontend (React Native + Expo)** and **Backend (Django + Supabase)** environments for the Omnigym Social App project. It's cross-platform and supports both **iOS and Android**.

---

## 📦 Prerequisites

Before you begin, install the following tools based on your platform:

### Required for All Platforms:
- [Node.js](https://nodejs.org/) (includes npm)
- [Python 3.11+](https://www.python.org/downloads/)
- Git ([Download](https://git-scm.com/))
- Expo CLI (optional): `npm install -g expo-cli`

### 💻 Platform-Specific Requirements:
<br>

| Tool / Requirement              | Windows                                | macOS / WSL (Linux)                         | Notes                                                                 |
|--------------------------------|-----------------------------------------|---------------------------------------------|-----------------------------------------------------------------------|
| **Node.js**                    | ✅ [nodejs.org](https://nodejs.org)     | ✅ [nodejs.org](https://nodejs.org)         | Required for React Native / Expo                                      |
| **Expo CLI** / `npx expo`     | ✅ `npx expo start`                     | ✅ `npx expo start`                         | No need to install globally; CLI optional                            |
| **Watchman**                  | ❌ Not needed                           | ✅ `brew install watchman` (macOS only)     | Improves live reload; not supported on Windows                        |
| **Python 3.11+**              | ✅ [python.org](https://python.org)     | ✅ `brew install python@3.11` (optional)    | Required for Django backend                                           |
| **Pip + Virtualenv**          | ✅ Included with Python                 | ✅ Included / install via brew              | For managing backend dependencies                                     |
| **PostgreSQL** (Supabase)     | ❌ Supabase handles DB remotely         | ❌ Supabase handles DB remotely             | No local installation needed                                          |
| **Android Studio**            | ✅ Required for emulator testing        | ✅ Required for Android testing             | iOS testing on Mac only                                               |
| **iOS Simulator**             | ❌ Not available                        | ✅ Xcode required from App Store            | iOS development requires macOS                                        |
| **Git**                       | ✅ [git-scm.com](https://git-scm.com)   | ✅ Included or install via Homebrew         | For cloning the project repository                                    |
| **Homebrew**                  | ❌ Not applicable                       | ✅ `/bin/bash -c "$(curl ...)"`          | Optional; helpful for installing tools like Watchman or Python       |

---

# 🚀 Project Installation
After completing and verifying the above is installed for your operating system, proceed with the steps below.

## 1. Clone the Repository
```bash
git clone https://github.com/yourusername/OmniGymSocialApp.git
cd OmniGymSocialApp
```

## 2. Frontend Setup (React Native + Expo)
```bash
cd Fullstack/Frontend
npm install
npx expo start         # Starts Expo server
# OR:
npx expo start --clear  # Clears cache and starts server
```

### Optional (macOS only):
```bash
brew install watchman   # Fast refresh for React Native
```

---

## 3. Backend Setup (Django + Supabase)
```bash
cd ../Backend
python -m venv venv
# macOS / Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate
```

### Install dependencies:
```bash
pip install -r requirements.txt
```

### Migrate database and run server:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Create a superuser:
```bash
python manage.py createsuperuser
```

---

## 🔐 Supabase Integration

### Create `.env` file in the `Backend/` folder:
```dotenv
SUPABASE_DB_URL=your_supabase_database_url
SUPABASE_API_KEY=your_supabase_service_role_key
```

> 💡 Replace values with actual credentials from your Supabase dashboard. Tables can be found below.

### Test Supabase Connection
```bash
python test_connection.py
```
More info: [Supabase Guide](https://supabase.com/docs/guides/database/overview)

<br><br>
---
---

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
   - 8 Character minimum
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
             - Sumo/Conventional Deadlifting
             - Pace Time
             - Bench press
             - Squat
          - Implement Bryzkie formula to calculate one-rep maximum values.
          - Use value with body weight and gender to calculate Wilks 2020 score.           
          - _Optional: Gym's can incentivize competition by applying a credit amount for winner(s) for that month_
     - Create personalized competitions amongst friends
     - Archived leaderboards
2. Workout plans
     - Share plans with others
     - Create plans
        - "Add exercise" button
        - Gif demonstrations (unavailable)
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
     - General information
     - Wilk's Score
         - Only if all 3 options for lifting PR's are filled out with weight and reps
         - Lifting coefficients: Wilk's score https://strengthlevel.com/wilks-calculator#wilksScoreResults
7. Events
     - Local events (i.e. Spartan race, fitness competitions)
     - Gym location events (i.e. Daddy daughter dances, V-Day dance, pickleball match)
     - Gym approved clubs
        - Terms and conditions
        - Check-ins
8. Support
     - Feedback form
     - Support Form (e.g.: If user changes gyms, they can submit a ticket to change gyms in account)
  
**Note:** <br>
[Lift Weight + reps] or [time + dist] for PR exercises is necessary when calculating their Wilks 2 scores with the coefficient formulas.<br>
Gender and user's weight is also necessary, so "other" or NULL should result in an error.

<br><br>
---
---
<br><br><br>

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

**User Settings Metrics (optional):**
  1. Gender
  2. Weight
  3. Fitness Goal (string)
  4. Caption
  5. Deadlift PR:
     - Weight(lbs or kg)
     - reps (max 10)
  7. Bench PR:
     - Weight(lbs or kg)
     - reps (max 10)
  8. Squats PR:
     - Weight(lbs or kg)
     - reps (max 10)
  10. running time Pace: use time & distance
  11. Wilk's 2020 Score
      - Only if all 3 options for lifting PR's are filled out with weight and reps
      - Lifting coefficients: Wilk's score https://strengthlevel.com/wilks-calculator#wilksScoreResults



### Database Tables to Store Data (backend):
```
----------------------------------------------------
-- ---------------- ALL GYMS: ----------------------
----------------------------------------------------
-- PURPOSE: Gym support system
create table public."OmnigymSupport" (
  "ticketID" bigint generated by default as identity not null,
  email text not null,
  "timeSent" timestamp without time zone not null default (now() AT TIME ZONE 'utc'::text),
  "memberID" character varying null,
  "gymAbbr" public.ABBR null,
  "tcktCategory" public.CATEGORY not null,
  "inputMsg" text not null,
  status public.TCKTSTATUS not null,
  "gymName" text null,
  auth_user_id uuid not null,
  auth_gym_id uuid not null,
  constraint OmnigymSupport_pkey primary key ("ticketID"),
  constraint OmnigymSupport_auth_gym_id_key unique (auth_gym_id),
  constraint OmnigymSupport_auth_user_id_key unique (auth_user_id),
  constraint OmnigymSupport_auth_gym_id_fkey foreign KEY (auth_gym_id) references auth.users (id) on delete set null,
  constraint OmnigymSupport_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null
) TABLESPACE pg_default;

-- PURPOSE: Stores affiliated gyms and their details
create table public."AffilGyms" (
  "gymID" bigint generated by default as identity not null,
  "gymName" text not null,
  "gymCity" text not null,
  "gymState" text not null,
  "gymAbbr" text not null,
  "gymEmail" text not null,
  constraint affilgyms_pkey primary key ("gymID"),
  constraint AffilGyms_gymEmail_key unique ("gymEmail"),
  constraint AffilGyms_gymID_key unique ("gymID"),
  constraint unique_gym_location unique ("gymAbbr", "gymCity", "gymState")
) TABLESPACE pg_default;

----------------------------------------------------
-- --------- GYM-SPECIFIC ADMIN ACCESS -------------
----------------------------------------------------
-- PURPOSE: Gym-specific events; This will be viewed on events page for each gym-specific user
create table public."PFEvents" (
  "eventID" integer not null default nextval('ltfevents_eventid_seq'::regclass),
  "gymAbbr" public.ABBR not null,
  "gymCity" text null,
  "eventName" text not null,
  "eventDate" date null,
  "eventType" public.HOST null,
  "eventLocation" text null,
  "uploadDate" timestamp without time zone not null default now(),
  "gymState" text not null,
  "eventDesc" text null,
  constraint PFEvents_pkey primary key ("eventID"),
  constraint ltfevents_eventtype_check check (
    (
      "eventType" = any (array['Local'::"HOST", 'Gym-Hosted'::"HOST"])
    )
  )
) TABLESPACE pg_default;

-- PURPOSE: Table uploading/updating current active members by admin
create table public."PlanetFitnessDB" (
  "databaseID" integer not null default nextval('lifetimefitnessdb_databaseid_seq'::regclass),
  "gymCity" character varying(20) not null,
  "gymAbbr" public.ABBR not null,
  "memberID" character varying(15) not null,
  "lastName" text not null,
  "firstName" text not null,
  "uploadDate" timestamp without time zone not null default now(),
  "gymState" character varying not null,
  constraint PlanetFitnessDB_pkey primary key ("databaseID"),
  constraint PlanetFitnessDB_memberID_key unique ("memberID"),
  constraint pf_unique_gymabbr_memberid_city_state unique ("gymAbbr", "memberID", "gymCity", "gymState")
) TABLESPACE pg_default;

----------------------------------------------------
-- ----- GYM-SPECIFIC USERS (LTF example): ---------
----------------------------------------------------
-- During login, customers will need to be asked affiliated gym again to locate proper database
-- Then we won't need to have a separate accounts table to locate them each.

-- PURPOSE: Each gym gets a separate table for its members 
create table public."PFUsers" (
  id bigint generated by default as identity not null,
  "memberID" character varying(15) not null,
  "gymAbbr" public.ABBR not null,
  "gymCity" character varying(20) not null,
  "lastName" text not null,
  "firstName" text not null,
  email text not null,
  "birthDate" text not null,
  "phoneNum" character varying(12) not null default ''::character varying,
  gender public.genderaccnt not null,
  "termsAccepted" boolean not null default false,
  "dateJoined" date not null,
  "activeAccnt" boolean not null default true,
  "gymState" character varying not null,
  auth_user_id uuid null,
  password text not null default ''::text,
  constraint PFUsers_pkey primary key (id),
  constraint PFUsers_memberID_key unique ("memberID"),
  constraint PFUsers_email_key unique (email),
  constraint PFUsers_auth_user_id_key unique (auth_user_id),
  constraint pfusers_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFUsers_memberID_gymAbbr_gymCity_gymState_fkey foreign KEY ("memberID", "gymAbbr", "gymCity", "gymState") references "PlanetFitnessDB" ("memberID", "gymAbbr", "gymCity", "gymState"),
  constraint PFUsers_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint ltfusers_gender_check check (
    (
      (gender)::text = any (
        array[
          ('Male'::character varying)::text,
          ('Female'::character varying)::text,
          ('Other'::character varying)::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

-- PURPOSE: Stores user settings per gym
create table public."PFUserSettings" (
  "settingsID" bigint generated by default as identity not null,
  email character varying not null,
  "profilePublic" boolean not null default true,
  caption character varying null,
  units public.UNITS not null default 'Imperial'::"UNITS",
  "fitnessGoal" character varying null,
  age smallint null,
  "prSong" character varying null,
  trophies smallint null,
  "profileImg" text null,
  auth_user_id uuid not null,
  constraint PFUserSettings_pkey primary key ("settingsID"),
  constraint PFUserSettings_auth_user_id_key unique (auth_user_id),
  constraint PFUserSettings_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFUserSettings_email_fkey foreign KEY (email) references "PFUsers" (email)
) TABLESPACE pg_default;

-- PURPOSE: Stores fitness metrics (can be used eventually for Wilks 2 score)
create table public."PFUserMetrics" (
  "metricsID" bigint generated by default as identity not null,
  "updatedDate" date not null,
  email text not null,
  gender public.GENDERCNTST not null,
  "memberWeight" real null,
  height character varying null,
  "prBenchWeight" real null,
  "prBenchReps" smallint null,
  "prDeadliftWeight" real null,
  "prDeadliftReps" smallint null,
  "prSquatWeight" real null,
  "prSquatReps" smallint null,
  "runningTime" text null,
  "runningDist" double precision null,
  "wilks2Score" integer null,
  auth_user_id uuid not null,
  constraint PFUserMetrics_pkey primary key ("metricsID"),
  constraint PFUserMetrics_auth_user_id_key unique (auth_user_id),
  constraint PFUserMetrics_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFUserMetrics_email_fkey foreign KEY (email) references "PFUsers" (email)
) TABLESPACE pg_default;

-- PURPOSE: Leaderboard for gym-specific competitions. 
-- Only approved submissions should be displayed on page.
create table public."PFLeaderboard" (
  "leaderboardID" bigint generated by default as identity not null,
  "submissionDate" date not null,
  email text not null,
  "cntstCategory" public.CATEGORY not null,
  "memberWeight" real null,
  "prWeight" real null,
  "prReps" smallint null,
  "proofVideo" character varying null,
  approved boolean not null default false,
  "permToPostVid" boolean null default true,
  auth_user_id uuid not null,
  constraint PFLeaderboard_pkey primary key ("leaderboardID"),
  constraint PFLeaderboard_auth_user_id_key unique (auth_user_id),
  constraint PFLeaderboard_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFLeaderboard_email_fkey foreign KEY (email) references "PFUsers" (email)
) TABLESPACE pg_default;

-- PURPOSE: Stores archived winners 
create table public."PFArchivedLeaderboards" (
  "leaderboardID" bigint generated by default as identity not null,
  email text not null,
  "archivedMonth" date null,
  "submissionDate" date null,
  "cntstCategory" public.PRCATEGORY null,
  "prWeight" real null,
  "prReps" smallint null,
  "gymAbbr" text null,
  auth_user_id uuid not null,
  constraint PFArchivedLeaderboards_pkey primary key ("leaderboardID"),
  constraint PFArchivedLeaderboards_auth_user_id_key unique (auth_user_id),
  constraint PFArchivedLeaderboards_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFArchivedLeaderboards_email_fkey foreign KEY (email) references "PFUsers" (email)
) TABLESPACE pg_default;

-- PURPOSE: Messaging system (Inbox) (research how to create inbox db)
create table public."PFMessages" (
  "messageID" bigint generated by default as identity not null,
  "userEmail" text not null,
  "receiverEmail" text not null,
  "messageDate" timestamp without time zone not null default now(),
  "messageText" text not null,
  sender_user_id uuid not null,
  receiver_user_id uuid not null,
  constraint PFMessages_pkey primary key ("messageID"),
  constraint PFMessages_receiver_user_id_key unique (receiver_user_id),
  constraint PFMessages_sender_user_id_key unique (sender_user_id),
  constraint PFMessages_receiverEmail_fkey foreign KEY ("receiverEmail") references "PFUsers" (email),
  constraint PFMessages_sender_user_id_fkey foreign KEY (sender_user_id) references auth.users (id) on delete set null,
  constraint PFMessages_userEmail_fkey foreign KEY ("userEmail") references "PFUsers" (email),
  constraint PFMessages_receiver_user_id_fkey foreign KEY (receiver_user_id) references auth.users (id) on delete set null
) TABLESPACE pg_default;

-- PURPOSE: Stores workout plans
create table public."PFWorkoutPlans" (
  "planID" bigint generated by default as identity not null,
  email text not null,
  title text not null,
  "dayOfWeek" public.DAYOFWEEK null,
  "exactDate" date null,
  created timestamp without time zone null default now(),
  auth_user_id uuid not null,
  constraint PFWorkoutPlans_pkey primary key ("planID"),
  constraint PFWorkoutPlans_auth_user_id_key unique (auth_user_id),
  constraint PFWorkoutPlans_title_key unique (title),
  constraint PFWorkoutPlans_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFWorkoutPlans_email_fkey foreign KEY (email) references "PFUsers" (email)
) TABLESPACE pg_default;

-- PURPOSE: Stores exercises linked to a workout plan
create table public."PFExercises" (
  "exerciseID" bigint generated by default as identity not null,
  "planID" bigint not null,
  "exerciseName" text not null,
  sets smallint null,
  reps smallint null,
  "weightAmnt" real null,
  duration real null,
  distance real null,
  auth_user_id uuid not null,
  constraint PFExercises_pkey primary key ("exerciseID"),
  constraint PFExercises_auth_user_id_key unique (auth_user_id),
  constraint PFExercises_auth_user_id_fkey foreign KEY (auth_user_id) references auth.users (id) on delete set null,
  constraint PFExercises_planID_fkey foreign KEY ("planID") references "PFWorkoutPlans" ("planID")
) TABLESPACE pg_default;

```


