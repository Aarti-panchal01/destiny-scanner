/**
 * Advanced astrological calculations based on birth date
 * Provides detailed zodiac information, planetary influences, and more
 */

interface AstrologicalDetails {
  sunSign: {
    name: string;
    symbol: string;
    dateRange: string;
    element: string;
    quality: string; // Cardinal, Fixed, or Mutable
    rulingPlanet: string;
    luckyColors: string[];
    luckyGemstones: string[];
    luckyNumbers: number[];
    strengths: string[];
    weaknesses: string[];
  };
  moonSign?: {
    name: string;
    influence: string;
  };
  ascendantSign?: {
    name: string;
    influence: string;
  };
  elementInfluence: {
    primaryElement: string;
    elementDescription: string;
    elementTraits: string[];
  };
  planetaryInfluence: {
    dominantPlanet: string;
    planetDescription: string;
    planetaryTraits: string[];
  };
  luckyDay?: string;
  luckyDirection?: string;
  dailyMantra?: string;
  pastLifeInfluences?: string[];
  karmicLessons?: string[];
  spiritualGifts?: string[];
}

/**
 * Calculate detailed astrological information based on birth date
 * @param birthDate User's birth date
 * @param birthTime Optional birth time for more accurate calculations
 * @param birthLocation Optional birth location for ascendant calculations
 */
export const calculateAstrologicalDetails = (
  birthDate: Date,
  birthTime?: string,
  birthLocation?: string
): AstrologicalDetails => {
  const month = birthDate.getMonth() + 1; // JavaScript months are 0-indexed
  const day = birthDate.getDate();
  
  // Determine zodiac sign based on month and day
  let sunSign = determineSunSign(month, day);
  
  // Calculate moon sign if time is provided (simplified approximation)
  let moonSign = undefined;
  if (birthTime) {
    moonSign = approximateMoonSign(birthDate, birthTime);
  }
  
  // Calculate ascendant sign if time and location are provided (simplified approximation)
  let ascendantSign = undefined;
  if (birthTime && birthLocation) {
    ascendantSign = approximateAscendantSign(birthDate, birthTime, birthLocation);
  }
  
  // Calculate element influence
  const elementInfluence = calculateElementInfluence(sunSign.element);
  
  // Calculate planetary influence
  const planetaryInfluence = calculatePlanetaryInfluence(sunSign.rulingPlanet);
  
  // Calculate additional astrological details
  const luckyDay = calculateLuckyDay(birthDate);
  const luckyDirection = calculateLuckyDirection(sunSign.element);
  const dailyMantra = generateDailyMantra(sunSign.name);
  const pastLifeInfluences = generatePastLifeInfluences(sunSign.element, birthDate);
  const karmicLessons = calculateKarmicLessons(birthDate);
  const spiritualGifts = calculateSpiritualGifts(sunSign.element, sunSign.quality);
  
  return {
    sunSign,
    moonSign,
    ascendantSign,
    elementInfluence,
    planetaryInfluence,
    luckyDay,
    luckyDirection,
    dailyMantra,
    pastLifeInfluences,
    karmicLessons,
    spiritualGifts
  };
};

/**
 * Determine the sun sign (zodiac) based on month and day
 */
const determineSunSign = (month: number, day: number) => {
  // Aries (March 21 - April 19)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      name: "Aries",
      symbol: "♈",
      dateRange: "March 21 - April 19",
      element: "Fire",
      quality: "Cardinal",
      rulingPlanet: "Mars",
      luckyColors: ["Red", "Orange", "Yellow"],
      luckyGemstones: ["Diamond", "Ruby", "Jasper"],
      luckyNumbers: [1, 9, 27],
      strengths: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic", "Honest", "Passionate"],
      weaknesses: ["Impatient", "Moody", "Short-tempered", "Impulsive", "Aggressive"]
    };
  }
  // Taurus (April 20 - May 20)
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      name: "Taurus",
      symbol: "♉",
      dateRange: "April 20 - May 20",
      element: "Earth",
      quality: "Fixed",
      rulingPlanet: "Venus",
      luckyColors: ["Green", "Pink", "Blue"],
      luckyGemstones: ["Emerald", "Rose Quartz", "Sapphire"],
      luckyNumbers: [2, 6, 24],
      strengths: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable", "Grounded"],
      weaknesses: ["Stubborn", "Possessive", "Uncompromising", "Materialistic", "Resistant to change"]
    };
  }
  // Gemini (May 21 - June 20)
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      name: "Gemini",
      symbol: "♊",
      dateRange: "May 21 - June 20",
      element: "Air",
      quality: "Mutable",
      rulingPlanet: "Mercury",
      luckyColors: ["Yellow", "Light Blue", "Silver"],
      luckyGemstones: ["Agate", "Chrysoprase", "Citrine"],
      luckyNumbers: [3, 5, 14],
      strengths: ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick-witted", "Versatile", "Communicative"],
      weaknesses: ["Nervous", "Inconsistent", "Indecisive", "Superficial", "Scattered"]
    };
  }
  // Cancer (June 21 - July 22)
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      name: "Cancer",
      symbol: "♋",
      dateRange: "June 21 - July 22",
      element: "Water",
      quality: "Cardinal",
      rulingPlanet: "Moon",
      luckyColors: ["White", "Silver", "Light Blue"],
      luckyGemstones: ["Pearl", "Moonstone", "Opal"],
      luckyNumbers: [2, 7, 16],
      strengths: ["Tenacious", "Highly Imaginative", "Loyal", "Emotional", "Sympathetic", "Nurturing", "Protective"],
      weaknesses: ["Moody", "Pessimistic", "Suspicious", "Manipulative", "Insecure"]
    };
  }
  // Leo (July 23 - August 22)
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: "Leo",
      symbol: "♌",
      dateRange: "July 23 - August 22",
      element: "Fire",
      quality: "Fixed",
      rulingPlanet: "Sun",
      luckyColors: ["Gold", "Orange", "Red"],
      luckyGemstones: ["Ruby", "Amber", "Tiger's Eye"],
      luckyNumbers: [1, 4, 19],
      strengths: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous", "Loyal"],
      weaknesses: ["Arrogant", "Stubborn", "Self-centered", "Inflexible", "Domineering"]
    };
  }
  // Virgo (August 23 - September 22)
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      name: "Virgo",
      symbol: "♍",
      dateRange: "August 23 - September 22",
      element: "Earth",
      quality: "Mutable",
      rulingPlanet: "Mercury",
      luckyColors: ["Green", "Brown", "Navy Blue"],
      luckyGemstones: ["Peridot", "Jade", "Amazonite"],
      luckyNumbers: [3, 6, 12],
      strengths: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Detail-oriented", "Methodical"],
      weaknesses: ["Overly Critical", "Perfectionist", "Shy", "Worrisome", "Overly Conservative"]
    };
  }
  // Libra (September 23 - October 22)
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      name: "Libra",
      symbol: "♎",
      dateRange: "September 23 - October 22",
      element: "Air",
      quality: "Cardinal",
      rulingPlanet: "Venus",
      luckyColors: ["Pink", "Light Blue", "White"],
      luckyGemstones: ["Sapphire", "Opal", "Rose Quartz"],
      luckyNumbers: [4, 6, 15],
      strengths: ["Diplomatic", "Fair-minded", "Social", "Cooperative", "Gracious", "Peace-loving", "Harmonious"],
      weaknesses: ["Indecisive", "Avoids Confrontations", "Carries Grudges", "Self-pitying", "People-pleasing"]
    };
  }
  // Scorpio (October 23 - November 21)
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      name: "Scorpio",
      symbol: "♏",
      dateRange: "October 23 - November 21",
      element: "Water",
      quality: "Fixed",
      rulingPlanet: "Pluto, Mars",
      luckyColors: ["Deep Red", "Maroon", "Black"],
      luckyGemstones: ["Topaz", "Obsidian", "Garnet"],
      luckyNumbers: [8, 11, 22],
      strengths: ["Resourceful", "Passionate", "Intuitive", "Determined", "Magnetic", "Investigative", "Powerful"],
      weaknesses: ["Jealous", "Secretive", "Resentful", "Manipulative", "Distrusting"]
    };
  }
  // Sagittarius (November 22 - December 21)
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      name: "Sagittarius",
      symbol: "♐",
      dateRange: "November 22 - December 21",
      element: "Fire",
      quality: "Mutable",
      rulingPlanet: "Jupiter",
      luckyColors: ["Blue", "Purple", "Indigo"],
      luckyGemstones: ["Turquoise", "Amethyst", "Sapphire"],
      luckyNumbers: [3, 9, 21],
      strengths: ["Generous", "Idealistic", "Philosophical", "Optimistic", "Enthusiastic", "Honest", "Adventurous"],
      weaknesses: ["Restless", "Impatient", "Careless", "Tactless", "Over-confident"]
    };
  }
  // Capricorn (December 22 - January 19)
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      name: "Capricorn",
      symbol: "♑",
      dateRange: "December 22 - January 19",
      element: "Earth",
      quality: "Cardinal",
      rulingPlanet: "Saturn",
      luckyColors: ["Brown", "Gray", "Dark Green"],
      luckyGemstones: ["Garnet", "Onyx", "Lapis Lazuli"],
      luckyNumbers: [4, 8, 17],
      strengths: ["Responsible", "Disciplined", "Self-controlled", "Persistent", "Cautious", "Practical", "Ambitious"],
      weaknesses: ["Pessimistic", "Stubborn", "Detached", "Workaholic", "Unforgiving"]
    };
  }
  // Aquarius (January 20 - February 18)
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      name: "Aquarius",
      symbol: "♒",
      dateRange: "January 20 - February 18",
      element: "Air",
      quality: "Fixed",
      rulingPlanet: "Uranus, Saturn",
      luckyColors: ["Electric Blue", "Turquoise", "Silver"],
      luckyGemstones: ["Amethyst", "Aquamarine", "Labradorite"],
      luckyNumbers: [4, 7, 11],
      strengths: ["Progressive", "Original", "Independent", "Humanitarian", "Inventive", "Logical", "Visionary"],
      weaknesses: ["Emotionally Detached", "Stubborn", "Aloof", "Unpredictable", "Extremist"]
    };
  }
  // Pisces (February 19 - March 20)
  else {
    return {
      name: "Pisces",
      symbol: "♓",
      dateRange: "February 19 - March 20",
      element: "Water",
      quality: "Mutable",
      rulingPlanet: "Neptune, Jupiter",
      luckyColors: ["Sea Green", "Indigo", "Purple"],
      luckyGemstones: ["Aquamarine", "Amethyst", "Moonstone"],
      luckyNumbers: [3, 7, 12],
      strengths: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise", "Musical", "Empathetic"],
      weaknesses: ["Escapist", "Idealistic", "Oversensitive", "Indecisive", "Easily Influenced"]
    };
  }
};

/**
 * Simplified approximation of moon sign based on birth date and time
 * Note: In a real application, this would use more accurate astronomical calculations
 */
const approximateMoonSign = (birthDate: Date, birthTime: string): { name: string; influence: string } => {
  // This is a simplified approximation - a real app would use ephemeris calculations
  const moonSigns = [
    {
      name: "Aries Moon",
      influence: "Emotional impulsivity, quick reactions, independent feelings"
    },
    {
      name: "Taurus Moon",
      influence: "Emotional stability, sensual nature, comfort-seeking"
    },
    {
      name: "Gemini Moon",
      influence: "Emotional adaptability, intellectual approach to feelings, communicative"
    },
    {
      name: "Cancer Moon",
      influence: "Deeply emotional, nurturing, protective, moody"
    },
    {
      name: "Leo Moon",
      influence: "Emotionally expressive, proud, dramatic, generous"
    },
    {
      name: "Virgo Moon",
      influence: "Emotionally analytical, perfectionist, practical approach to feelings"
    },
    {
      name: "Libra Moon",
      influence: "Emotionally balanced, partnership-oriented, diplomatic"
    },
    {
      name: "Scorpio Moon",
      influence: "Intense emotions, deeply passionate, private, resilient"
    },
    {
      name: "Sagittarius Moon",
      influence: "Emotionally optimistic, freedom-loving, philosophical"
    },
    {
      name: "Capricorn Moon",
      influence: "Emotionally reserved, disciplined feelings, responsible"
    },
    {
      name: "Aquarius Moon",
      influence: "Emotionally detached, humanitarian emotional responses"
    },
    {
      name: "Pisces Moon", 
      influence: "Emotionally sensitive, compassionate, intuitive, dreamy"
    }
  ];
  
  // Use a deterministic but simplified way to select a moon sign based on birth details
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const hour = parseInt(birthTime.split(':')[0]);
  
  // Simple hashing algorithm to select a moon sign
  const moonSignIndex = (day + month + hour) % 12;
  return moonSigns[moonSignIndex];
};

/**
 * Simplified approximation of ascendant sign based on birth details
 * Note: In a real application, this would use more accurate astronomical calculations
 */
const approximateAscendantSign = (
  birthDate: Date, 
  birthTime: string, 
  birthLocation: string
): { name: string; influence: string } => {
  // This is a simplified approximation - a real app would use astronomical calculations
  const ascendantSigns = [
    {
      name: "Aries Ascendant",
      influence: "Direct approach to life, assertive demeanor, pioneering"
    },
    {
      name: "Taurus Ascendant",
      influence: "Steady approach to life, reliable appearance, practical"
    },
    {
      name: "Gemini Ascendant",
      influence: "Communicative demeanor, curious approach, youthful energy"
    },
    {
      name: "Cancer Ascendant",
      influence: "Nurturing presence, protective shell, emotional approach"
    },
    {
      name: "Leo Ascendant",
      influence: "Charismatic presence, confident demeanor, expressive"
    },
    {
      name: "Virgo Ascendant",
      influence: "Analytical approach, detail-oriented, service-focused"
    },
    {
      name: "Libra Ascendant",
      influence: "Diplomatic demeanor, beauty-focused, partnership-oriented"
    },
    {
      name: "Scorpio Ascendant",
      influence: "Mysterious presence, intense approach, transformative"
    },
    {
      name: "Sagittarius Ascendant",
      influence: "Optimistic demeanor, philosophical approach, freedom-loving"
    },
    {
      name: "Capricorn Ascendant",
      influence: "Reserved presence, ambitious approach, responsible"
    },
    {
      name: "Aquarius Ascendant",
      influence: "Unique demeanor, humanitarian approach, intellectual"
    },
    {
      name: "Pisces Ascendant", 
      influence: "Mystical presence, dreamy approach, compassionate"
    }
  ];
  
  // Use a deterministic but simplified way to select an ascendant sign based on birth details
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const hour = parseInt(birthTime.split(':')[0]);
  const locationHash = birthLocation.length; // Very simplified location influence
  
  // Simple hashing algorithm to select an ascendant sign
  const ascendantSignIndex = (day + month + hour + locationHash) % 12;
  return ascendantSigns[ascendantSignIndex];
};

/**
 * Calculate element influence based on zodiac element
 */
const calculateElementInfluence = (element: string) => {
  switch (element) {
    case "Fire":
      return {
        primaryElement: "Fire",
        elementDescription: "Dynamic, passionate, and energetic in nature",
        elementTraits: ["Enthusiastic", "Action-oriented", "Impulsive", "Creative", "Inspiring"]
      };
    case "Earth":
      return {
        primaryElement: "Earth",
        elementDescription: "Grounded, practical, and stabilizing in nature",
        elementTraits: ["Reliable", "Pragmatic", "Patient", "Materialistic", "Secure"]
      };
    case "Air":
      return {
        primaryElement: "Air",
        elementDescription: "Intellectual, communicative, and social in nature",
        elementTraits: ["Analytical", "Communicative", "Social", "Conceptual", "Objective"]
      };
    case "Water":
      return {
        primaryElement: "Water",
        elementDescription: "Emotional, intuitive, and deeply feeling in nature",
        elementTraits: ["Empathetic", "Intuitive", "Emotional", "Nurturing", "Sensitive"]
      };
    default:
      return {
        primaryElement: "Balanced",
        elementDescription: "Harmonious blend of elemental influences",
        elementTraits: ["Adaptable", "Balanced", "Versatile", "Harmonious", "Moderate"]
      };
  }
};

/**
 * Calculate planetary influence based on ruling planet
 */
const calculatePlanetaryInfluence = (planet: string) => {
  const planets: Record<string, { description: string; traits: string[] }> = {
    "Sun": {
      description: "The life force, vitality, and core identity",
      traits: ["Confident", "Proud", "Creative", "Authoritative", "Generous"]
    },
    "Moon": {
      description: "The emotional nature, instincts, and subconscious",
      traits: ["Intuitive", "Nurturing", "Moody", "Protective", "Sensitive"]
    },
    "Mercury": {
      description: "The mind, communication, and intellectual abilities",
      traits: ["Intelligent", "Communicative", "Analytical", "Curious", "Adaptable"]
    },
    "Venus": {
      description: "Love, beauty, pleasure, and attraction",
      traits: ["Affectionate", "Artistic", "Diplomatic", "Sensual", "Charming"]
    },
    "Mars": {
      description: "Energy, passion, drive, and determination",
      traits: ["Assertive", "Courageous", "Energetic", "Competitive", "Bold"]
    },
    "Jupiter": {
      description: "Expansion, growth, wisdom, and abundance",
      traits: ["Optimistic", "Generous", "Philosophical", "Enthusiastic", "Lucky"]
    },
    "Saturn": {
      description: "Discipline, responsibility, restrictions, and lessons",
      traits: ["Disciplined", "Responsible", "Patient", "Ambitious", "Persistent"]
    },
    "Uranus": {
      description: "Innovation, rebellion, originality, and change",
      traits: ["Original", "Independent", "Inventive", "Progressive", "Unconventional"]
    },
    "Neptune": {
      description: "Spirituality, dreams, illusions, and transcendence",
      traits: ["Imaginative", "Spiritual", "Compassionate", "Dreamy", "Idealistic"]
    },
    "Pluto": {
      description: "Transformation, power, regeneration, and rebirth",
      traits: ["Transformative", "Intense", "Powerful", "Secretive", "Perceptive"]
    }
  };
  
  // Handle compound planet influences (e.g., "Pluto, Mars")
  const primaryPlanet = planet.split(',')[0].trim();
  
  if (planets[primaryPlanet]) {
    return {
      dominantPlanet: primaryPlanet,
      planetDescription: planets[primaryPlanet].description,
      planetaryTraits: planets[primaryPlanet].traits
    };
  } else {
    return {
      dominantPlanet: "Cosmic Forces",
      planetDescription: "Multiple celestial influences at work",
      planetaryTraits: ["Balanced", "Cosmic", "Multifaceted", "Universal", "Harmonious"]
    };
  }
};

/**
 * Calculate the lucky day based on birth date
 */
const calculateLuckyDay = (birthDate: Date): string => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const birthDay = birthDate.getDate();
  const birthMonth = birthDate.getMonth() + 1;
  
  // Simple algorithm to determine lucky day
  const luckyDayIndex = (birthDay + birthMonth) % 7;
  return days[luckyDayIndex];
};

/**
 * Calculate the lucky direction based on element
 */
const calculateLuckyDirection = (element: string): string => {
  const elementDirections: Record<string, string> = {
    "Fire": "South",
    "Earth": "North",
    "Air": "East",
    "Water": "West"
  };
  
  return elementDirections[element] || "Northeast";
};

/**
 * Generate a daily mantra based on zodiac sign
 */
const generateDailyMantra = (zodiacSign: string): string => {
  const mantras: Record<string, string> = {
    "Aries": "I am bold, courageous, and capable of achieving anything I set my mind to.",
    "Taurus": "I embrace stability and find strength in my patience and determination.",
    "Gemini": "I communicate with clarity and embrace the duality of my nature as a source of wisdom.",
    "Cancer": "I nurture myself and others with compassion, creating a safe space for emotional growth.",
    "Leo": "I shine my light brightly and inspire others with my authentic self-expression.",
    "Virgo": "I perfect my craft with dedication and find joy in the details of life's journey.",
    "Libra": "I create harmony within and around me, embracing balance in all aspects of life.",
    "Scorpio": "I transform through life's challenges, emerging stronger and more powerful.",
    "Sagittarius": "I seek truth and adventure, expanding my horizons with optimism and faith.",
    "Capricorn": "I climb the mountains of life with discipline and achieve my ambitions step by step.",
    "Aquarius": "I innovate and bring unique perspectives, creating positive change in the world.",
    "Pisces": "I flow with the currents of life, trusting my intuition to guide me to my highest good."
  };
  
  return mantras[zodiacSign] || "I am aligned with the cosmic energies that guide my highest purpose.";
};

/**
 * Generate past life influences based on element and birth date
 */
const generatePastLifeInfluences = (element: string, birthDate: Date): string[] => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  
  const elementInfluences: Record<string, string[]> = {
    "Fire": [
      "Warrior or military leader in ancient times",
      "Spiritual leader or religious figure",
      "Explorer or pioneer in uncharted territories",
      "Revolutionary who fought for change"
    ],
    "Earth": [
      "Farmer or agricultural specialist",
      "Craftsperson or artisan",
      "Merchant or trader of goods",
      "Builder or architect of significant structures"
    ],
    "Air": [
      "Scholar or academic in ancient learning centers",
      "Diplomat or messenger between kingdoms",
      "Writer or keeper of knowledge",
      "Teacher or philosopher sharing wisdom"
    ],
    "Water": [
      "Healer or medicine practitioner",
      "Mystic or intuitive guide",
      "Artist or creative visionary",
      "Sailor or navigator of seas"
    ]
  };
  
  // Select two past life influences based on birth details
  const availableInfluences = elementInfluences[element] || elementInfluences["Fire"];
  const index1 = day % availableInfluences.length;
  const index2 = month % availableInfluences.length;
  
  // Ensure we don't return duplicates
  return index1 === index2 
    ? [availableInfluences[index1], "Guide or mentor to others on their spiritual path"] 
    : [availableInfluences[index1], availableInfluences[index2]];
};

/**
 * Calculate karmic lessons based on birth date
 */
const calculateKarmicLessons = (birthDate: Date): string[] => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  const karmicLessonPool = [
    "Learning to balance self-reliance with accepting help from others",
    "Developing patience and persistence through life's challenges",
    "Finding your authentic voice and expressing your truth",
    "Healing ancestral patterns and generational wounds",
    "Balancing material success with spiritual growth",
    "Learning to set healthy boundaries in relationships",
    "Developing compassion without sacrificing your needs",
    "Embracing change as a catalyst for growth",
    "Finding courage to pursue your true purpose",
    "Learning to trust your intuition and inner guidance",
    "Balancing giving and receiving in equal measure",
    "Releasing fear-based thinking and embracing abundance"
  ];
  
  // Select karmic lessons based on birth details
  const index1 = day % karmicLessonPool.length;
  const index2 = month % karmicLessonPool.length;
  const index3 = (year % 100) % karmicLessonPool.length;
  
  // Remove duplicates
  const uniqueIndices = [...new Set([index1, index2, index3])];
  return uniqueIndices.map(index => karmicLessonPool[index]);
};

/**
 * Calculate spiritual gifts based on element and quality
 */
const calculateSpiritualGifts = (element: string, quality: string): string[] => {
  const elementGifts: Record<string, string[]> = {
    "Fire": ["Inspiration", "Courage", "Leadership", "Passion", "Intuitive insight"],
    "Earth": ["Manifestation", "Healing touch", "Grounding presence", "Practical wisdom", "Abundance attraction"],
    "Air": ["Clear communication", "Intellectual insights", "Visionary thinking", "Spiritual connection", "Mediumship"],
    "Water": ["Emotional healing", "Intuitive dreams", "Psychic perception", "Empathic connection", "Soul recognition"]
  };
  
  const qualityGifts: Record<string, string[]> = {
    "Cardinal": ["Initiating spiritual paths", "Leadership in spiritual communities", "Opening new doors for others"],
    "Fixed": ["Maintaining sacred traditions", "Deep spiritual devotion", "Holding space for transformation"],
    "Mutable": ["Adapting to spiritual teachings", "Bridging different beliefs", "Spiritual versatility"]
  };
  
  // Select gifts from both element and quality
  const selectedElementGifts = elementGifts[element] || elementGifts["Fire"];
  const selectedQualityGifts = qualityGifts[quality] || qualityGifts["Cardinal"];
  
  // Return 2 element gifts and 1 quality gift
  return [
    selectedElementGifts[0], 
    selectedElementGifts[2], 
    selectedQualityGifts[0]
  ];
};
