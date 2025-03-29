import { calculateDestinyNumber } from "./destinyCalculator";
import { getZodiacSign } from "./zodiacCalculator";
import { calculateAstrologicalDetails } from "./astrologicalCalculations";

export interface NumerologyProfile {
  mulank: {
    number: number;
    meaning: string;
    traits: string[];
  };
  bhagyank: {
    number: number;
    meaning: string;
    traits: string[];
  };
  powerNumber: {
    number: number;
    meaning: string;
  };
  rulingPlanet: {
    name: string;
    influence: string;
  };
  vibration: string;
  positivePaths: string[];
  challenges: string[];
  compatibleNumbers: number[];
  financialInfluence: string;
  careerSuggestions: string[];
  healthConsiderations: string;
  spiritualLessons: string[];
  luckyColors: string[];
  luckyDays: string[];
  luckyMonths: string[];
  luckyGemstones: string[];
  elementInfluence: string;
  personalityOverview: string;
  relationshipTraits: string[];
  financialTraits: string[];
  healthTraits: string[];
  careerPaths: string[];
  lifeLessons: string[];
}

export function calculateNumerologyProfile(birthDate: Date): NumerologyProfile {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const mulankNumber = day % 9 === 0 ? 9 : day % 9;
  const bhagyankNumber = calculateDestinyNumber(birthDate);
  const powerNumberValue = (mulankNumber + bhagyankNumber) % 9 === 0 ? 9 : (mulankNumber + bhagyankNumber) % 9;

  const mulankMeanings: { [key: number]: { meaning: string; traits: string[] } } = {
    1: { meaning: "Leadership and Independence", traits: ["Independent", "Ambitious", "Determined"] },
    2: { meaning: "Harmony and Diplomacy", traits: ["Diplomatic", "Cooperative", "Sensitive"] },
    3: { meaning: "Creativity and Expression", traits: ["Creative", "Optimistic", "Communicative"] },
    4: { meaning: "Stability and Practicality", traits: ["Practical", "Organized", "Reliable"] },
    5: { meaning: "Freedom and Adventure", traits: ["Adventurous", "Versatile", "Curious"] },
    6: { meaning: "Responsibility and Nurturing", traits: ["Nurturing", "Responsible", "Harmonious"] },
    7: { meaning: "Spirituality and Wisdom", traits: ["Introspective", "Wise", "Intuitive"] },
    8: { meaning: "Ambition and Authority", traits: ["Ambitious", "Authoritative", "Successful"] },
    9: { meaning: "Compassion and Humanitarianism", traits: ["Compassionate", "Generous", "Idealistic"] },
  };

  const rulingPlanets: { [key: number]: { name: string; influence: string } } = {
    1: { name: "Sun", influence: "Leadership and Vitality" },
    2: { name: "Moon", influence: "Emotion and Intuition" },
    3: { name: "Jupiter", influence: "Expansion and Wisdom" },
    4: { name: "Rahu", influence: "Innovation and Unconventionality" },
    5: { name: "Mercury", influence: "Communication and Adaptability" },
    6: { name: "Venus", influence: "Love and Harmony" },
    7: { name: "Ketu", influence: "Spirituality and Introspection" },
    8: { name: "Saturn", influence: "Discipline and Responsibility" },
    9: { name: "Mars", influence: "Courage and Energy" },
  };

  const vibrations: { [key: number]: string } = {
    1: "New beginnings and independence",
    2: "Balance and harmony",
    3: "Creativity and self-expression",
    4: "Stability and hard work",
    5: "Change and adventure",
    6: "Love and responsibility",
    7: "Introspection and spirituality",
    8: "Success and abundance",
    9: "Completion and compassion",
  };

  const positivePaths: { [key: number]: string[] } = {
    1: ["Leadership roles", "Entrepreneurship", "Innovation"],
    2: ["Diplomacy", "Counseling", "Arts"],
    3: ["Writing", "Public speaking", "Creative arts"],
    4: ["Management", "Engineering", "Finance"],
    5: ["Travel", "Marketing", "Technology"],
    6: ["Healthcare", "Education", "Social work"],
    7: ["Research", "Philosophy", "Spiritual leadership"],
    8: ["Business", "Politics", "Real estate"],
    9: ["Humanitarian work", "Teaching", "Activism"],
  };

  const challenges: { [key: number]: string[] } = {
    1: ["Ego", "Impatience", "Stubbornness"],
    2: ["Indecisiveness", "Over-sensitivity", "Avoidance of conflict"],
    3: ["Superficiality", "Lack of focus", "Procrastination"],
    4: ["Rigidity", "Resistance to change", "Workaholism"],
    5: ["Restlessness", "Impulsivity", "Lack of commitment"],
    6: ["Perfectionism", "Over-sacrifice", "Control issues"],
    7: ["Isolation", "Skepticism", "Over-thinking"],
    8: ["Greed", "Authoritarianism", "Stress"],
    9: ["Idealism", "Self-righteousness", "Burnout"],
  };

  const financialInfluences: { [key: number]: string } = {
    1: "Potential for high income through leadership and innovation",
    2: "Financial stability through partnerships and diplomacy",
    3: "Income through creative endeavors and communication",
    4: "Steady income through hard work and organization",
    5: "Variable income through diverse opportunities",
    6: "Financial security through service and responsibility",
    7: "Income through intellectual pursuits and spiritual guidance",
    8: "High earning potential through business and investment",
    9: "Financial rewards through humanitarian efforts and generosity",
  };

  const careerSuggestions: { [key: number]: string[] } = {
    1: ["CEO", "Entrepreneur", "Inventor"],
    2: ["Diplomat", "Therapist", "Artist"],
    3: ["Writer", "Speaker", "Designer"],
    4: ["Accountant", "Engineer", "Manager"],
    5: ["Marketer", "Travel agent", "Technologist"],
    6: ["Nurse", "Teacher", "Social worker"],
    7: ["Researcher", "Philosopher", "Spiritual leader"],
    8: ["Executive", "Politician", "Investor"],
    9: ["Philanthropist", "Activist", "Counselor"],
  };

  const healthConsiderations: { [key: number]: string } = {
    1: "Heart health and blood pressure",
    2: "Digestive issues and emotional balance",
    3: "Nervous system and skin conditions",
    4: "Skeletal system and chronic conditions",
    5: "Respiratory system and anxiety",
    6: "Reproductive system and hormonal balance",
    7: "Mental health and immune system",
    8: "Liver function and stress management",
    9: "Inflammation and immune disorders",
  };

  const spiritualLessons: { [key: number]: string[] } = {
    1: ["Humility", "Cooperation", "Patience"],
    2: ["Self-confidence", "Assertiveness", "Independence"],
    3: ["Discipline", "Focus", "Practicality"],
    4: ["Adaptability", "Commitment", "Self-control"],
    5: ["Responsibility", "Balance", "Self-care"],
    6: ["Open-mindedness", "Trust", "Intuition"],
    7: ["Moderation", "Gratitude", "Generosity"],
    8: ["Compassion", "Forgiveness", "Acceptance"],
    9: ["Self-awareness", "Authenticity", "Integrity"],
  };

  const luckyColors: { [key: number]: string[] } = {
    1: ["Gold", "Yellow", "Orange"],
    2: ["Silver", "White", "Green"],
    3: ["Purple", "Pink", "Yellow"],
    4: ["Green", "Brown", "Gray"],
    5: ["White", "Silver", "Turquoise"],
    6: ["Blue", "Pink", "Green"],
    7: ["Purple", "Gray", "White"],
    8: ["Black", "Brown", "Dark Green"],
    9: ["Red", "Pink", "Gold"],
  };

  const luckyDays: { [key: number]: string[] } = {
    1: ["Sunday", "Monday"],
    2: ["Monday", "Friday"],
    3: ["Thursday", "Friday"],
    4: ["Saturday", "Sunday"],
    5: ["Wednesday", "Friday"],
    6: ["Friday", "Wednesday"],
    7: ["Monday", "Thursday"],
    8: ["Saturday", "Tuesday"],
    9: ["Tuesday", "Thursday"],
  };

  const luckyMonths: { [key: number]: string[] } = {
    1: ["January", "October"],
    2: ["February", "November"],
    3: ["March", "December"],
    4: ["April", "January"],
    5: ["May", "February"],
    6: ["June", "March"],
    7: ["July", "April"],
    8: ["August", "May"],
    9: ["September", "June"],
  };

  const luckyGemstones: { [key: number]: string[] } = {
    1: ["Ruby", "Topaz", "Garnet"],
    2: ["Pearl", "Moonstone", "Jade"],
    3: ["Amethyst", "Turquoise", "Citrine"],
    4: ["Emerald", "Sapphire", "Peridot"],
    5: ["Diamond", "Aquamarine", "Opal"],
    6: ["Rose Quartz", "Emerald", "Lapis Lazuli"],
    7: ["Amethyst", "Opal", "Alexandrite"],
    8: ["Sapphire", "Onyx", "Black Tourmaline"],
    9: ["Garnet", "Coral", "Bloodstone"],
  };

  const compatibleNumbers: { [key: number]: number[] } = {
    1: [3, 5, 6],
    2: [1, 6, 9],
    3: [1, 5, 9],
    4: [2, 7, 8],
    5: [1, 3, 7],
    6: [1, 2, 9],
    7: [2, 4, 5],
    8: [4, 7, 9],
    9: [2, 3, 6, 8],
  };

  const mulank = {
    number: mulankNumber,
    meaning: mulankMeanings[mulankNumber]?.meaning || "Unknown",
    traits: mulankMeanings[mulankNumber]?.traits || []
  };

  const bhagyank = {
    number: bhagyankNumber,
    meaning: mulankMeanings[bhagyankNumber]?.meaning || "Unknown",
    traits: mulankMeanings[bhagyankNumber]?.traits || []
  };

  const powerNumber = { number: powerNumberValue, meaning: vibrations[powerNumberValue] || "Unknown" };
  const rulingPlanet = rulingPlanets[mulankNumber] || { name: "Unknown", influence: "Unknown" };
  const vibration = vibrations[powerNumberValue] || "Unknown";
  const positivePathsForNumber = positivePaths[powerNumberValue] || [];
  const challengesForNumber = challenges[powerNumberValue] || [];
  const compatibleNumbersForNumber = compatibleNumbers[mulankNumber] || [];
  const financialInfluence = financialInfluences[powerNumberValue] || "Unknown";
  const careerSuggestionsForNumber = careerSuggestions[powerNumberValue] || [];
  const healthConsideration = healthConsiderations[powerNumberValue] || "Unknown";
  const spiritualLessonsForNumber = spiritualLessons[powerNumberValue] || [];
  const luckyColorsForNumber = luckyColors[powerNumberValue] || [];
  const luckyDaysForNumber = luckyDays[powerNumberValue] || [];
  const luckyMonthsForNumber = luckyMonths[powerNumberValue] || [];
  const luckyGemstonesForNumber = luckyGemstones[powerNumberValue] || [];

  const personalityOverviewText = "Your numerological destiny number " + bhagyankNumber + " suggests that you have a unique blend of " +
    mulankMeanings[mulankNumber]?.traits.join(", ").toLowerCase() + " qualities that shape your approach to life. You naturally gravitate towards " +
    positivePathsForNumber.join(", ").toLowerCase() + " while being mindful of tendencies toward " + 
    challengesForNumber.join(", ").toLowerCase() + ".";

  const relationshipTraitsArray = [
    "Values " + (mulankNumber % 2 === 0 ? "harmony and emotional connection" : "honesty and independence"),
    "Communicates with " + (bhagyankNumber % 2 === 0 ? "sensitivity and empathy" : "directness and clarity"),
    "Seeks " + (powerNumberValue < 5 ? "depth and lasting connection" : "excitement and spontaneity")
  ];

  const financialTraitsArray = [
    "Approach to money: " + (mulankNumber % 2 === 0 ? "cautious and saving-oriented" : "dynamic and opportunity-focused"),
    "Financial strength: " + (bhagyankNumber < 5 ? "planning and structure" : "adaptability and resourcefulness"),
    financialInfluence
  ];

  const healthTraitsArray = [
    "Physical energy: " + (mulankNumber < 5 ? "steady and enduring" : "dynamic and variable"),
    "Mental approach: " + (bhagyankNumber % 2 === 0 ? "balanced and contemplative" : "energetic and action-oriented"),
    healthConsideration
  ];

  const lifeLessonsArray = spiritualLessonsForNumber.length > 0
    ? spiritualLessonsForNumber
    : ["Balancing material and spiritual aspects of life", 
       "Finding inner harmony through acceptance", 
       "Developing wisdom through life experiences"];

  return {
    mulank,
    bhagyank,
    powerNumber,
    rulingPlanet,
    vibration,
    positivePaths: positivePathsForNumber,
    challenges: challengesForNumber,
    compatibleNumbers: compatibleNumbersForNumber,
    financialInfluence,
    careerSuggestions: careerSuggestionsForNumber,
    healthConsiderations: healthConsideration,
    spiritualLessons: spiritualLessonsForNumber,
    luckyColors: luckyColorsForNumber,
    luckyDays: luckyDaysForNumber,
    luckyMonths: luckyMonthsForNumber,
    luckyGemstones: luckyGemstonesForNumber,
    elementInfluence: getElementInfluence(mulank.number),
    personalityOverview: personalityOverviewText,
    relationshipTraits: relationshipTraitsArray,
    financialTraits: financialTraitsArray,
    healthTraits: healthTraitsArray,
    careerPaths: careerSuggestionsForNumber,
    lifeLessons: lifeLessonsArray
  };
}

function getElementInfluence(number: number): string {
  const elements = {
    1: "Fire - passion, energy, and leadership",
    2: "Water - emotion, intuition, and harmony",
    3: "Fire - creativity, expression, and joy",
    4: "Earth - stability, practicality, and organization",
    5: "Air - freedom, change, and adventure",
    6: "Earth - responsibility, nurturing, and balance",
    7: "Water - spirituality, wisdom, and introspection",
    8: "Earth - ambition, authority, and achievement",
    9: "Fire - compassion, completion, and humanitarianism"
  };
  
  return elements[number as keyof typeof elements] || "Unknown elemental influence";
}

export function calculatePersonalYear(birthDate: Date): number {
  const currentYear = new Date().getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  const sum = calculateDestinyNumber(new Date(`${currentYear}-${birthMonth}-${birthDay}`));
  return sum;
}

export function calculatePersonalMonth(birthDate: Date): number {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const currentYear = currentDate.getFullYear();

  const personalYear = calculatePersonalYear(birthDate);
  const sum = calculateDestinyNumber(new Date(`${currentYear}-${currentMonth}-${birthDay}`))
  return sum;
}

export function analyzeNameNumerology(name: string): {
  overallVibration: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
} {
  const letterValues: { [key: string]: number } = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };

  const lowerName = name.toLowerCase().replace(/[^a-z]/g, '');

  let expressionNumber = 0;
  let soulUrgeNumber = 0;
  let personalityNumber = 0;

  for (let char of lowerName) {
    expressionNumber += letterValues[char] || 0;

    if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
      soulUrgeNumber += letterValues[char] || 0;
    } else {
      personalityNumber += letterValues[char] || 0;
    }
  }

  expressionNumber = expressionNumber % 9 === 0 ? 9 : expressionNumber % 9;
  soulUrgeNumber = soulUrgeNumber % 9 === 0 ? 9 : soulUrgeNumber % 9;
  personalityNumber = personalityNumber % 9 === 0 ? 9 : personalityNumber % 9;

  const overallVibration = calculateDestinyNumber(new Date());

  return {
    overallVibration,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber
  };
}

export function calculateSpiritualPath(birthDate: Date): number {
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  const birthYear = birthDate.getFullYear();

  const monthValue = birthMonth % 9 === 0 ? 9 : birthMonth % 9;
  const dayValue = birthDay % 9 === 0 ? 9 : birthDay % 9;
  const yearValue = birthYear
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);

  let spiritualPathNumber = monthValue + dayValue + yearValue;
  spiritualPathNumber = spiritualPathNumber % 9 === 0 ? 9 : spiritualPathNumber % 9;

  return spiritualPathNumber;
}
