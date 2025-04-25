// Brzycki formula to estimate 1RM
export const calculateBrzycki1RM = (weight: number, reps?: number): number => {
    const actualReps = reps ?? 1;
    return weight / (1.0278 - 0.0278 * actualReps);
  };
  
  // Main Wilks 2020 score calculator
  export const Wilks2Score = (
    gender: string,
    memberWeight: number,
    lifts: number[]
  ): number | null => {
    if (!memberWeight || lifts.length === 0 || !['Male', 'Female'].includes(gender)) return null;
  
    console.log("----------- Received in Wilks2Score: ------------");
    console.log("Gender:", gender);
    console.log("Member Weight (kg):", memberWeight);
    console.log("Lifts (1RMs in kg):", lifts);
    
    const coeffs = gender === 'Female'
      ? [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08]
      : [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08];
  
    const [a, b, c, d, e, f] = coeffs;
    const totalLift = lifts.reduce((sum, lift) => sum + lift, 0);
  
    const denom =
      a +
      b * memberWeight +
      c * memberWeight ** 2 +
      d * memberWeight ** 3 +
      e * memberWeight ** 4 +
      f * memberWeight ** 5;
  
    if (denom === 0) return null;
  
    return Math.round((totalLift * 500) / denom);
  };
  
  // helper to wrap everything
  export const computeWilksScore = ({
    gender,
    memberWeight,
    prBenchWeight,
    prBenchReps,
    prSquatWeight,
    prSquatReps,
    prDeadliftWeight,
    prDeadliftReps,
  }: {
    gender: string;
    memberWeight?: number;
    prBenchWeight?: number;
    prBenchReps?: number;
    prSquatWeight?: number;
    prSquatReps?: number;
    prDeadliftWeight?: number;
    prDeadliftReps?: number;
  }): number | null => {
    if (!gender || !memberWeight) return null;
  

    const bench1RM = prBenchWeight ? calculateBrzycki1RM(prBenchWeight, prBenchReps) : 0;
    const squat1RM = prSquatWeight ? calculateBrzycki1RM(prSquatWeight, prSquatReps) : 0;
    const deadlift1RM = prDeadliftWeight ? calculateBrzycki1RM(prDeadliftWeight, prDeadliftReps) : 0;
  
    if (!bench1RM || !squat1RM || !deadlift1RM) return null;
  
    return Wilks2Score(gender, memberWeight, [bench1RM, squat1RM, deadlift1RM]);
  };


// // Wilks2Score.ts

// export const calculateBrzycki1RM = (weight: number, reps?: number) => {
//     const actualReps = reps ?? 1;
//     return weight / (1.0278 - (0.0278 * actualReps));
//   };
  
//   export const Wilks2Score = (
//     gender: string,
//     memberWeight: number,
//     lifts: number[]
//   ): number | null => {
//     if (!memberWeight || lifts.length === 0) return null;
  
//     console.log("----------- Received in Wilks2Score:------------");
//     console.log("gender:", gender);
//     console.log("memberWeight:", memberWeight);
//     console.log("lifts:", lifts);


//     const coeffs = gender === 'Female'
//       ? [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08]
//       : [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08];
  
//     // const sum1RM = lifts.reduce((acc, curr) => acc + curr, 0);
//     // const [a, b, c, d, e, f] = coeffs;
//     const [a, b, c, d, e, f] = coeffs;
//     const totalLift = lifts.reduce((sum, lift) => sum + lift, 0);

//     // console.log('Coefficients:', coeffs);

//     // const denomStep1 = a;
//     // console.log('Step 1 (a):', a);
//     // console.log('Step 2 (b * memberWeight):', b * memberWeight);
//     // console.log('Step 3 (c * memberWeight^2):', c * memberWeight ** 2);
//     // console.log('Step 4 (d * memberWeight^3):', d * memberWeight ** 3);
//     // console.log('Step 5 (e * memberWeight^4):', e * memberWeight ** 4); 
//     // console.log('Step 6 (f * memberWeight^5):', f * memberWeight ** 5);

//     const denom =
//         a +
//         b * memberWeight +
//         c * memberWeight ** 2 +
//         d * memberWeight ** 3 +
//         e * memberWeight ** 4 +
//         f * memberWeight ** 5;

//     // console.log('Total Lift:', totalLift);
//     // console.log('Denom:', denom);

//     if (denom === 0) 
//         return null;

//     return Math.round(totalLift * 500 / denom);
// };
  
//   export const useWilksScore = ({
//     gender,
//     memberWeight,
//     prBenchWeight,
//     prBenchReps,
//     prSquatWeight,
//     prSquatReps,
//     prDeadliftWeight,
//     prDeadliftReps,
//   }: {
//     gender: string;
//     memberWeight: number;
//     prBenchWeight?: number;
//     prBenchReps?: number;
//     prSquatWeight?: number;
//     prSquatReps?: number;
//     prDeadliftWeight?: number;
//     prDeadliftReps?: number;
//   }): number | null => {
//     if (!gender || !['Male', 'Female'].includes(gender)) return null;
//     if (!memberWeight) return null;
    
//     // console.log("prBenchWeight:", prBenchWeight);
//     // console.log("prBenchReps:", prBenchReps);
//     // console.log("prSquatWeight:", prSquatWeight);
//     // console.log("prSquatReps:", prSquatReps);
//     // console.log("prDeadliftWeight:", prDeadliftWeight);
//     // console.log("prDeadliftReps:", prDeadliftReps);
//     // console.log("Member Weight:", memberWeight);

//     const bench1RM = prBenchWeight ? calculateBrzycki1RM(prBenchWeight, prBenchReps) : 0;
//     const squat1RM = prSquatWeight ? calculateBrzycki1RM(prSquatWeight, prSquatReps) : 0;
//     const deadlift1RM = prDeadliftWeight ? calculateBrzycki1RM(prDeadliftWeight, prDeadliftReps) : 0;
  
//     console.log(bench1RM, squat1RM, deadlift1RM);
//     if (!bench1RM || !squat1RM || !deadlift1RM) return null;
//     const total = bench1RM + squat1RM + deadlift1RM;
//     // console.log('Bench 1RM:', bench1RM);
//     // console.log('Squat 1RM:', squat1RM);
//     // console.log('Deadlift 1RM:', deadlift1RM);
//     // console.log('Member Weight:', memberWeight);
//     // console.log('Total:', total);

//     const score = Wilks2Score(gender, memberWeight, [bench1RM, squat1RM, deadlift1RM]);
//     console.log('Wilks Score:', score);
//     return Wilks2Score(gender, memberWeight, [bench1RM, squat1RM, deadlift1RM]);
//   };
  

// import { useEffect, useState } from 'react';

// export const calculateBrzycki1RM = (weight: number, reps?: number) => {
//   const actualReps = reps ?? 1;
//   return weight / (1.0278 - 0.0278 * actualReps);
// };

// export const Wilks2Score = (
//     gender: string,
//     memberWeight: number,
//     lifts: number[]
//   ): number | null => {
//     if (!memberWeight || lifts.length === 0) return null;
  
//     const sum1RM = lifts.reduce((acc, curr) => acc + curr, 0);
  
//     const coeffs = gender === 'Female'
//       ? [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08]
//       : [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08];
  
//     const [a, b, c, d, e, f] = coeffs;
//     const denom =
//       a +
//       b * memberWeight +
//       c * Math.pow(memberWeight, 2) +
//       d * Math.pow(memberWeight, 3) +
//       e * Math.pow(memberWeight, 4) +
//       f * Math.pow(memberWeight, 5);
  
//     return denom !== 0 ? Math.round(sum1RM * (500 / denom)) : null;
//   };
  

// export const useWilksScore = ({
//   gender,
//   memberWeight,
//   prBenchWeight,
//   prBenchReps,
//   prSquatWeight,
//   prSquatReps,
//   prDeadliftWeight,
//   prDeadliftReps,
// }: {
//   gender: string;
//   memberWeight: number;
//   prBenchWeight?: number;
//   prBenchReps?: number;
//   prSquatWeight?: number;
//   prSquatReps?: number;
//   prDeadliftWeight?: number;
//   prDeadliftReps?: number;
// }) => {
//   const [wilksScore, setWilksScore] = useState<number | null>(null);

//   useEffect(() => {
//     // Early exit if required data isn't available
//     if (
//         !gender || gender === 'Other' ||
//         !memberWeight || isNaN(memberWeight) || memberWeight < 30
//       ) {
//         setWilksScore(null);
//         return;
//       }
  
//     const bench1RM = prBenchWeight ? calculateBrzycki1RM(prBenchWeight, prBenchReps) : 0;
//     const squat1RM = prSquatWeight ? calculateBrzycki1RM(prSquatWeight, prSquatReps) : 0;
//     const deadlift1RM = prDeadliftWeight ? calculateBrzycki1RM(prDeadliftWeight, prDeadliftReps) : 0;

//     // Avoid calculating if any major lift is 0
//     if (!bench1RM || !squat1RM || !deadlift1RM) {
//         setWilksScore(null);
//         return;
//       }

//     const score = Wilks2Score(gender, memberWeight, [bench1RM, squat1RM, deadlift1RM]);
//       setWilksScore(score);
//   }, [
//     gender, memberWeight,
//     prBenchWeight, prBenchReps,
//     prSquatWeight, prSquatReps,
//     prDeadliftWeight, prDeadliftReps,
//   ]);
  

//   return wilksScore;
// };


// End of Wilks2Score.tsx
