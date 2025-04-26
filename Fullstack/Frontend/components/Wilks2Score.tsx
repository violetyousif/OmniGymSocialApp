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