
/**
 * Advanced numerology calculations for destiny number, life path, personality traits and more
 */

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
  compatibleNumbers: number[];
  incompatibleNumbers: number[];
  personalityOverview: string;
  careerPaths: string[];
  relationshipTraits: string[];
  financialTraits: string[];
  healthTraits: string[];
  lifeChallenges: string[];
  lifeLessons: string[];
  luckyColors: string[];
  luckyGemstones: string[];
}

/**
 * Calculate comprehensive numerology profile based on birth date
 * @param birthDate User's birth date
 */
export const calculateNumerologyProfile = (birthDate: Date): NumerologyProfile => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  // Calculate Mulank (Root Number) - based on birth day
  const mulank = calculateMulank(day);
  
  // Calculate Bhagyank (Destiny Number) - based on full birth date
  const bhagyank = calculateBhagyank(day, month, year);
  
  // Calculate Power Number - combination of Mulank and Bhagyank
  const powerNumber = calculatePowerNumber(mulank.number, bhagyank.number);
  
  // Determine ruling planet based on Bhagyank
  const rulingPlanet = determineRulingPlanet(bhagyank.number);
  
  // Calculate compatible and incompatible numbers
  const { compatibleNumbers, incompatibleNumbers } = calculateCompatibleNumbers(bhagyank.number);
  
  // Generate personality overview based on numerology profile
  const personalityOverview = generatePersonalityOverview(mulank.number, bhagyank.number, powerNumber.number);
  
  // Determine career paths based on numerology
  const careerPaths = determineCareerPaths(bhagyank.number, mulank.number);
  
  // Determine relationship traits
  const relationshipTraits = determineRelationshipTraits(bhagyank.number);
  
  // Determine financial traits
  const financialTraits = determineFinancialTraits(bhagyank.number);
  
  // Determine health traits
  const healthTraits = determineHealthTraits(mulank.number, bhagyank.number);
  
  // Determine life challenges
  const lifeChallenges = determineLifeChallenges(bhagyank.number);
  
  // Determine life lessons
  const lifeLessons = determineLifeLessons(bhagyank.number);
  
  // Determine lucky colors
  const luckyColors = determineLuckyColors(bhagyank.number);
  
  // Determine lucky gemstones
  const luckyGemstones = determineLuckyGemstones(bhagyank.number);
  
  return {
    mulank,
    bhagyank,
    powerNumber,
    rulingPlanet,
    compatibleNumbers,
    incompatibleNumbers,
    personalityOverview,
    careerPaths,
    relationshipTraits,
    financialTraits,
    healthTraits,
    lifeChallenges,
    lifeLessons,
    luckyColors,
    luckyGemstones
  };
};

/**
 * Calculate Mulank (Root Number) based on birth day
 */
const calculateMulank = (day: number): { number: number; meaning: string; traits: string[] } => {
  // Reduce to a single digit, except for master numbers
  let mulank = day;
  while (mulank > 9 && mulank !== 11 && mulank !== 22 && mulank !== 33) {
    let tempSum = 0;
    mulank.toString().split('').forEach(digit => {
      tempSum += parseInt(digit);
    });
    mulank = tempSum;
  }
  
  // Define meanings and traits for each Mulank
  const mulankMeanings: Record<number, { meaning: string; traits: string[] }> = {
    1: {
      meaning: "The Leader - Independent, assertive, and pioneering. You have natural leadership abilities and innovative ideas.",
      traits: ["Original", "Independent", "Creative", "Self-reliant", "Determined"]
    },
    2: {
      meaning: "The Mediator - Diplomatic, cooperative, and sensitive. You excel in partnerships and creating harmony.",
      traits: ["Cooperative", "Sensitive", "Diplomatic", "Supportive", "Intuitive"]
    },
    3: {
      meaning: "The Communicator - Expressive, creative, and social. You have natural charisma and artistic abilities.",
      traits: ["Creative", "Expressive", "Enthusiastic", "Social", "Optimistic"]
    },
    4: {
      meaning: "The Builder - Practical, disciplined, and hardworking. You create solid foundations in all areas of life.",
      traits: ["Practical", "Organized", "Reliable", "Hard-working", "Systematic"]
    },
    5: {
      meaning: "The Freedom Seeker - Adaptable, adventurous, and versatile. You embrace change and new experiences.",
      traits: ["Versatile", "Freedom-loving", "Adventurous", "Adaptable", "Progressive"]
    },
    6: {
      meaning: "The Nurturer - Responsible, caring, and harmonious. You have a deep sense of duty to others.",
      traits: ["Responsible", "Caring", "Balanced", "Supportive", "Loving"]
    },
    7: {
      meaning: "The Seeker - Analytical, spiritual, and introspective. You search for deeper meaning and truth.",
      traits: ["Analytical", "Introspective", "Spiritual", "Perfectionist", "Studious"]
    },
    8: {
      meaning: "The Achiever - Ambitious, authoritative, and goal-oriented. You have natural business acumen.",
      traits: ["Ambitious", "Authoritative", "Goal-oriented", "Practical", "Efficient"]
    },
    9: {
      meaning: "The Humanitarian - Compassionate, selfless, and idealistic. You have a universal perspective on life.",
      traits: ["Compassionate", "Idealistic", "Generous", "Universal", "Artistic"]
    },
    11: {
      meaning: "The Intuitive - Highly intuitive, spiritual, and inspired. You have unique insights and visionary abilities.",
      traits: ["Intuitive", "Inspired", "Idealistic", "Sensitive", "Visionary"]
    },
    22: {
      meaning: "The Master Builder - Practical visionary, powerful, and capable of manifesting grand ideas into reality.",
      traits: ["Practical visionary", "Powerful", "Ambitious", "Disciplined", "Influential"]
    },
    33: {
      meaning: "The Master Teacher - Highly compassionate, nurturing, and spiritual. You have a profound ability to uplift others.",
      traits: ["Altruistic", "Spiritual", "Compassionate", "Nurturing", "Inspirational"]
    }
  };
  
  return {
    number: mulank,
    meaning: mulankMeanings[mulank]?.meaning || "Unknown meaning",
    traits: mulankMeanings[mulank]?.traits || ["Unknown traits"]
  };
};

/**
 * Calculate Bhagyank (Destiny Number) based on full birth date
 */
const calculateBhagyank = (day: number, month: number, year: number): { number: number; meaning: string; traits: string[] } => {
  // Convert date to string and sum all digits
  const dateString = `${month}${day}${year}`;
  let sum = 0;
  for (let i = 0; i < dateString.length; i++) {
    sum += parseInt(dateString[i]);
  }
  
  // Reduce to a single digit, except for master numbers
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let tempSum = 0;
    sum.toString().split('').forEach(digit => {
      tempSum += parseInt(digit);
    });
    sum = tempSum;
  }
  
  // Define meanings and traits for each Bhagyank
  const bhagyankMeanings: Record<number, { meaning: string; traits: string[] }> = {
    1: {
      meaning: "The Pioneer - Your destiny is to lead, innovate, and forge new paths. Independence and originality are your strengths.",
      traits: ["Leadership", "Innovation", "Independence", "Determination", "Pioneering"]
    },
    2: {
      meaning: "The Diplomat - Your destiny is to create harmony, foster cooperation, and build meaningful partnerships.",
      traits: ["Diplomacy", "Cooperation", "Patience", "Sensitivity", "Balance"]
    },
    3: {
      meaning: "The Creator - Your destiny is to express yourself creatively, inspire others, and bring joy to the world.",
      traits: ["Creative expression", "Communication", "Joy", "Inspiration", "Sociability"]
    },
    4: {
      meaning: "The Builder - Your destiny is to create lasting structures, establish order, and provide stability for others.",
      traits: ["Stability", "Organization", "Reliability", "Practicality", "Endurance"]
    },
    5: {
      meaning: "The Freedom Seeker - Your destiny is to experience life fully, embrace change, and inspire freedom in others.",
      traits: ["Freedom", "Adaptability", "Versatility", "Adventure", "Experience"]
    },
    6: {
      meaning: "The Nurturer - Your destiny is to care for others, create harmony in your community, and foster responsibility.",
      traits: ["Responsibility", "Love", "Service", "Harmony", "Compassion"]
    },
    7: {
      meaning: "The Mystic - Your destiny is to seek truth, develop wisdom, and understand life's deeper mysteries.",
      traits: ["Analysis", "Understanding", "Spirituality", "Wisdom", "Introspection"]
    },
    8: {
      meaning: "The Empowered - Your destiny is to achieve material and spiritual abundance, and to use power wisely.",
      traits: ["Achievement", "Abundance", "Authority", "Management", "Manifestation"]
    },
    9: {
      meaning: "The Humanitarian - Your destiny is to serve humanity, offer compassion, and embody universal love.",
      traits: ["Compassion", "Universality", "Selflessness", "Completion", "Philanthropy"]
    },
    11: {
      meaning: "The Illuminator - Your destiny is to inspire spiritual awareness, share intuitive insights, and illuminate paths for others.",
      traits: ["Inspiration", "Illumination", "Intuition", "Idealism", "Spirituality"]
    },
    22: {
      meaning: "The Master Builder - Your destiny is to transform dreams into reality on a large scale, benefiting many people.",
      traits: ["Manifestation", "Practicality", "Vision", "Leadership", "Empowerment"]
    },
    33: {
      meaning: "The Master Teacher - Your destiny is to uplift humanity through compassionate service and spiritual guidance.",
      traits: ["Compassion", "Healing", "Teaching", "Nurturing", "Enlightenment"]
    }
  };
  
  return {
    number: sum,
    meaning: bhagyankMeanings[sum]?.meaning || "Unknown meaning",
    traits: bhagyankMeanings[sum]?.traits || ["Unknown traits"]
  };
};

/**
 * Calculate Power Number - combination of Mulank and Bhagyank
 */
const calculatePowerNumber = (mulank: number, bhagyank: number): { number: number; meaning: string } => {
  // Calculate power number (simplified version)
  let powerNumber = mulank + bhagyank;
  
  // Reduce to a single digit, except for master numbers
  while (powerNumber > 9 && powerNumber !== 11 && powerNumber !== 22 && powerNumber !== 33) {
    let tempSum = 0;
    powerNumber.toString().split('').forEach(digit => {
      tempSum += parseInt(digit);
    });
    powerNumber = tempSum;
  }
  
  // Define meanings for each Power Number
  const powerNumberMeanings: Record<number, string> = {
    1: "Your power lies in leadership and innovation. You have the ability to pioneer new paths and inspire others to follow.",
    2: "Your power lies in diplomacy and intuition. You excel at bringing harmony to situations and sensing subtle energies.",
    3: "Your power lies in creative expression and communication. You can inspire others through your words and artistic talents.",
    4: "Your power lies in building and organizing. You excel at creating structures and systems that stand the test of time.",
    5: "Your power lies in adaptability and experiencing life fully. You bring progressive energy and excitement to any situation.",
    6: "Your power lies in nurturing and responsibility. You excel at caring for others and creating harmonious environments.",
    7: "Your power lies in analysis and spiritual insight. You can see beneath the surface and understand deeper truths.",
    8: "Your power lies in manifestation and achievement. You have the ability to create abundance in the material world.",
    9: "Your power lies in compassion and universal understanding. You can connect with diverse people and serve humanity.",
    11: "Your power lies in spiritual insight and inspiration. You can access higher knowledge and illuminate paths for others.",
    22: "Your power lies in making dreams reality on a large scale. You can manifest great works that benefit many people.",
    33: "Your power lies in spiritual teaching and healing. You can uplift others through compassionate service and wisdom."
  };
  
  return {
    number: powerNumber,
    meaning: powerNumberMeanings[powerNumber] || "Your power combines multiple cosmic influences, creating a unique energy signature."
  };
};

/**
 * Determine ruling planet based on Bhagyank (Destiny Number)
 */
const determineRulingPlanet = (bhagyank: number): { name: string; influence: string } => {
  const planetaryInfluences: Record<number, { name: string; influence: string }> = {
    1: {
      name: "Sun",
      influence: "The Sun brings leadership qualities, vitality, and a strong sense of self. It illuminates your path with clarity and purpose."
    },
    2: {
      name: "Moon",
      influence: "The Moon brings emotional sensitivity, intuition, and nurturing qualities. It connects you to your inner world and subconscious."
    },
    3: {
      name: "Jupiter",
      influence: "Jupiter brings expansion, optimism, and wisdom. It blesses you with growth opportunities and a philosophical outlook."
    },
    4: {
      name: "Uranus",
      influence: "Uranus brings innovation, originality, and revolutionary thinking. It helps you break free from limitations and embrace new ideas."
    },
    5: {
      name: "Mercury",
      influence: "Mercury brings communication skills, versatility, and intelligence. It gives you adaptability and quick thinking."
    },
    6: {
      name: "Venus",
      influence: "Venus brings harmony, beauty, and love. It enhances your relationships and appreciation for the arts and pleasures of life."
    },
    7: {
      name: "Neptune",
      influence: "Neptune brings spirituality, imagination, and intuition. It connects you to mystical realms and creative inspiration."
    },
    8: {
      name: "Saturn",
      influence: "Saturn brings discipline, responsibility, and achievement. It helps you build lasting structures and reach ambitious goals."
    },
    9: {
      name: "Mars",
      influence: "Mars brings energy, courage, and determination. It empowers you to take action and overcome challenges with force of will."
    },
    11: {
      name: "Sun and Moon",
      influence: "The combined influence of Sun and Moon brings illuminated intuition, balancing conscious and subconscious, light and shadow."
    },
    22: {
      name: "Uranus and Neptune",
      influence: "The combined influence of Uranus and Neptune brings practical mysticism, allowing you to manifest spiritual visions in reality."
    },
    33: {
      name: "Jupiter and Venus",
      influence: "The combined influence of Jupiter and Venus brings expansive love, allowing you to nurture and teach with compassion and wisdom."
    }
  };
  
  return planetaryInfluences[bhagyank] || {
    name: "Cosmic Forces",
    influence: "Multiple celestial influences work together in your chart, creating a unique cosmic signature."
  };
};

/**
 * Calculate compatible and incompatible numbers based on Bhagyank (Destiny Number)
 */
const calculateCompatibleNumbers = (bhagyank: number): { compatibleNumbers: number[]; incompatibleNumbers: number[] } => {
  const compatibilityMap: Record<number, { compatible: number[]; incompatible: number[] }> = {
    1: {
      compatible: [3, 5, 9],
      incompatible: [4, 8]
    },
    2: {
      compatible: [4, 6, 8],
      incompatible: [1, 7]
    },
    3: {
      compatible: [1, 5, 9],
      incompatible: [2, 8]
    },
    4: {
      compatible: [2, 7, 8],
      incompatible: [1, 9]
    },
    5: {
      compatible: [1, 3, 7],
      incompatible: [6, 8]
    },
    6: {
      compatible: [2, 8, 9],
      incompatible: [3, 5]
    },
    7: {
      compatible: [4, 5, 9],
      incompatible: [2, 6]
    },
    8: {
      compatible: [2, 4, 6],
      incompatible: [1, 3]
    },
    9: {
      compatible: [1, 3, 6, 7],
      incompatible: [4, 5]
    },
    11: {
      compatible: [2, 4, 11, 22],
      incompatible: [3, 7]
    },
    22: {
      compatible: [4, 11, 22, 33],
      incompatible: [1, 9]
    },
    33: {
      compatible: [6, 9, 22, 33],
      incompatible: [5, 8]
    }
  };
  
  return {
    compatibleNumbers: compatibilityMap[bhagyank]?.compatible || [1, 3, 9],
    incompatibleNumbers: compatibilityMap[bhagyank]?.incompatible || [4, 8]
  };
};

/**
 * Generate personality overview based on numerology profile
 */
const generatePersonalityOverview = (mulank: number, bhagyank: number, powerNumber: number): string => {
  const mulankTraits = {
    1: "independent and innovative",
    2: "diplomatic and intuitive",
    3: "creative and expressive",
    4: "practical and organized",
    5: "adventurous and freedom-loving",
    6: "responsible and nurturing",
    7: "analytical and spiritual",
    8: "ambitious and authoritative",
    9: "compassionate and idealistic",
    11: "intuitive and inspired",
    22: "visionary and masterful",
    33: "compassionate and enlightened"
  };
  
  const bhagyankPaths = {
    1: "leadership and pioneering new paths",
    2: "cooperation and peacemaking",
    3: "self-expression and inspiring joy",
    4: "building solid foundations",
    5: "embracing change and adventure",
    6: "nurturing others and creating harmony",
    7: "seeking knowledge and spiritual truth",
    8: "achieving material success and authority",
    9: "serving humanity with compassion",
    11: "inspiring others with spiritual insights",
    22: "building large-scale, beneficial projects",
    33: "uplifting humanity through teaching and healing"
  };
  
  const powerInfluence = {
    1: "your leadership abilities",
    2: "your diplomatic skills",
    3: "your creative expression",
    4: "your organizational talents",
    5: "your adaptability",
    6: "your nurturing nature",
    7: "your analytical mind",
    8: "your manifestation power",
    9: "your humanitarian perspective",
    11: "your intuitive insights",
    22: "your masterful building skills",
    33: "your enlightened teaching"
  };
  
  return `Your personality combines being ${mulankTraits[mulank as keyof typeof mulankTraits] || "multifaceted"} with a life path focused on ${bhagyankPaths[bhagyank as keyof typeof bhagyankPaths] || "unique cosmic purposes"}. Your greatest potential emerges through ${powerInfluence[powerNumber as keyof typeof powerInfluence] || "your unique combination of cosmic energies"}, which gives you a distinct advantage in life's journey. You naturally gravitate toward situations where you can express your authentic nature and fulfill your cosmic blueprint.`;
};

/**
 * Determine suitable career paths based on numerology
 */
const determineCareerPaths = (bhagyank: number, mulank: number): string[] => {
  const careersByNumber: Record<number, string[]> = {
    1: ["Entrepreneur", "Executive", "Leader", "Inventor", "Independent Consultant"],
    2: ["Mediator", "Diplomat", "Counselor", "Partner in Business", "Team Coordinator"],
    3: ["Artist", "Writer", "Speaker", "Entertainer", "Creative Director"],
    4: ["Manager", "Accountant", "Engineer", "Builder", "Systems Analyst"],
    5: ["Traveler", "Marketer", "Journalist", "Sales Representative", "Freedom-Based Entrepreneur"],
    6: ["Teacher", "Counselor", "Healthcare Provider", "Community Organizer", "Designer"],
    7: ["Researcher", "Scientist", "Analyst", "Spiritual Teacher", "Investigator"],
    8: ["Financial Advisor", "Executive", "Manager", "Real Estate Developer", "Business Owner"],
    9: ["Humanitarian", "Social Worker", "Artist", "Healer", "International Relations"],
    11: ["Spiritual Guide", "Inspirational Speaker", "Counselor", "Visionary Leader", "Intuitive Healer"],
    22: ["Architect", "City Planner", "Business Magnate", "Organizational Leader", "Foundation Director"],
    33: ["Spiritual Teacher", "Healer", "Philanthropist", "Community Leader", "Educational Innovator"]
  };
  
  // Combine career suggestions based on both numbers
  const primaryCareers = careersByNumber[bhagyank] || [];
  const secondaryCareers = careersByNumber[mulank] || [];
  
  // Filter to get unique career suggestions
  return [...new Set([...primaryCareers, ...secondaryCareers.slice(0, 2)])];
};

/**
 * Determine relationship traits based on Bhagyank (Destiny Number)
 */
const determineRelationshipTraits = (bhagyank: number): string[] => {
  const relationshipTraitsByNumber: Record<number, string[]> = {
    1: ["Independent in relationships", "Needs a partner who respects your space", "Loyal but requires freedom", "Direct and honest communication", "May struggle with compromise"],
    2: ["Naturally partnership-oriented", "Diplomatic and sensitive to others", "Seeks harmony in relationships", "Intuitive about partner's needs", "Avoids conflict, may hold back feelings"],
    3: ["Charming and expressive in love", "Needs intellectual stimulation", "Communicates feelings openly", "Keeps relationships fun and light", "May be scattered in attention"],
    4: ["Loyal and stable partner", "Traditional approach to relationships", "Builds relationships slowly but solidly", "Reliable and trustworthy", "May be rigid in expectations"],
    5: ["Needs freedom in relationships", "Exciting and adventurous partner", "Resists being controlled", "Adaptable to changes", "May struggle with long-term commitment"],
    6: ["Deeply responsible in relationships", "Nurturing and supportive", "Creates harmony at home", "Committed to working things out", "May be overly self-sacrificing"],
    7: ["Selective in choosing partners", "Needs intellectual connection", "Values depth over surface attraction", "Appreciates spiritual connection", "May be emotionally reserved"],
    8: ["Power and security in relationships", "Protective of partner", "Generous but expects appreciation", "Goal-oriented approach to love", "May be controlling at times"],
    9: ["Universal love perspective", "Compassionate and forgiving", "Idealistic in relationships", "Seeks depth and meaning", "May prioritize others over relationship"],
    11: ["Seeks spiritual connection", "Intuitive about relationship dynamics", "Idealistic expectations", "Needs space for spiritual growth", "May be overly sensitive"],
    22: ["Builds long-lasting relationships", "Practical approach to relationship challenges", "Creates secure foundation", "Visionary about family future", "May be workaholic"],
    33: ["Deeply compassionate partner", "Nurturing without conditions", "Teaching and guiding energy", "Selfless in giving love", "May neglect own needs for partner"]
  };
  
  return relationshipTraitsByNumber[bhagyank] || [
    "Unique approach to relationships",
    "Balance of independence and togetherness",
    "Values authentic connection",
    "Intuitive about others' needs",
    "Evolving relationship style"
  ];
};

/**
 * Determine financial traits based on Bhagyank (Destiny Number)
 */
const determineFinancialTraits = (bhagyank: number): string[] => {
  const financialTraitsByNumber: Record<number, string[]> = {
    1: ["Natural ability to generate income", "Independent financial style", "Innovative money approaches", "May take financial risks", "Should focus on building sustainable wealth"],
    2: ["Collaborative approach to finances", "Best financial success through partnerships", "Intuitive about timing in investments", "Careful money manager", "Should balance giving and receiving"],
    3: ["Creative approach to money", "Income often from creative talents", "Optimistic financial attitude", "May spend impulsively on pleasures", "Should develop discipline in savings"],
    4: ["Methodical money manager", "Builds wealth gradually and securely", "Conservative investment approach", "Good at budgeting", "Should allow for occasional indulgence"],
    5: ["Fluctuating financial patterns", "Money comes and goes with ease", "Versatile income sources", "Adaptable to financial changes", "Should create flexible stability"],
    6: ["Responsible financial approach", "Often financially supports others", "Balance in giving and receiving", "Good at managing home finances", "Should ensure self-care in finances"],
    7: ["Analytical approach to money", "Often unusual sources of income", "Needs meaning in financial pursuits", "May undercharge for value", "Should trust intuition with investments"],
    8: ["Natural wealth consciousness", "Strong manifestation abilities", "Executive approach to finances", "Good at large-scale money management", "Should balance material and spiritual"],
    9: ["Humanitarian approach to wealth", "Money seen as energy for good", "Often receives unexpected financial support", "Generous with resources", "Should accept abundance as tool for service"],
    11: ["Intuitive financial decisions", "Money may come through inspirational work", "Fluctuating relationship with material world", "Needs financial security for peace of mind", "Should trust inner guidance with money"],
    22: ["Master builder of wealth", "Can create large-scale financial structures", "Practical and visionary with money", "Potential for significant abundance", "Should use wealth for greater good"],
    33: ["Money as tool for service", "Abundance through helping others", "Detachment from pure materialism", "Teaching others about abundance", "Should accept prosperity as divine support"]
  };
  
  return financialTraitsByNumber[bhagyank] || [
    "Balanced approach to finances",
    "Adaptable money management style",
    "Potential for unexpected financial support",
    "Should trust inner guidance with investments",
    "Focus on sustainable abundance"
  ];
};

/**
 * Determine health traits based on numerology
 */
const determineHealthTraits = (mulank: number, bhagyank: number): string[] => {
  const healthTraitsByNumber: Record<number, string[]> = {
    1: ["Vitality connected to sense of purpose", "Headaches when resisting path", "Benefits from independent exercise", "May push body too hard", "Needs adequate rest"],
    2: ["Sensitive digestive system", "Emotional health affects physical", "Benefits from gentle exercise", "May absorb others' energies", "Needs emotional balance for wellbeing"],
    3: ["Throat and respiratory focus", "Expression important for health", "Benefits from creative movement", "May neglect consistent self-care", "Needs joy for wellbeing"],
    4: ["Strong constitution when balanced", "Skeletal and dental focus", "Benefits from routine exercise", "May work to exhaustion", "Needs regular rest patterns"],
    5: ["Nervous system sensitivity", "Benefits from varied exercise", "May experience digestive issues with restriction", "Needs freedom of movement", "Benefits from nature exposure"],
    6: ["Heart and circulation focus", "Nurturing others affects health", "Benefits from balanced nutrition", "May neglect self-care for others", "Needs beauty for wellbeing"],
    7: ["Highly sensitive physical system", "Mental health affects physical", "Benefits from meditative movement", "May overthink health issues", "Needs mental peace for wellbeing"],
    8: ["Robust physical energy when aligned", "Back and structural focus", "Benefits from strengthening exercise", "May ignore body's signals", "Needs success-rest balance"],
    9: ["All body systems interconnected", "Universal health perspective", "Benefits from compassionate self-care", "May sacrifice health for service", "Needs alignment with higher purpose"],
    11: ["Sensitive nervous system", "Spiritual health affects physical", "Benefits from energy practices", "May be affected by environmental energies", "Needs grounding practices"],
    22: ["Strong physical stamina potential", "Practical approach to health needed", "Benefits from structured exercise", "May overextend physically", "Needs balance between vision and body care"],
    33: ["Compassionate body awareness", "Teaching others affects health", "Benefits from gentle movement", "May neglect self for others' care", "Needs self-nurturing practices"]
  };
  
  // Combine health traits from both numbers
  const primaryTraits = healthTraitsByNumber[bhagyank] || [];
  const secondaryTraits = healthTraitsByNumber[mulank] || [];
  
  // Return a mix of both, ensuring no duplicates
  return [...new Set([...primaryTraits.slice(0, 3), ...secondaryTraits.slice(0, 2)])];
};

/**
 * Determine life challenges based on Bhagyank (Destiny Number)
 */
const determineLifeChallenges = (bhagyank: number): string[] => {
  const challengesByNumber: Record<number, string[]> = {
    1: ["Balancing independence with connection", "Overcoming egotism", "Learning to listen to others", "Developing patience", "Finding your unique voice"],
    2: ["Making decisions without excessive input", "Standing up for yourself", "Addressing conflict directly", "Managing emotional sensitivity", "Setting healthy boundaries"],
    3: ["Focusing your creative energy", "Following through on projects", "Balancing expression with listening", "Managing scattered energy", "Disciplining your talents"],
    4: ["Embracing necessary changes", "Overcoming rigidity", "Finding joy in the process", "Balancing work and play", "Connecting to intuition"],
    5: ["Creating healthy commitments", "Finding depth in experiences", "Managing restless energy", "Creating sustainable freedom", "Focusing scattered attention"],
    6: ["Avoiding excessive responsibility", "Setting boundaries in relationships", "Balancing giving and receiving", "Releasing perfectionism", "Caring for yourself first"],
    7: ["Translating knowledge to wisdom", "Sharing your insights with others", "Overcoming isolation tendencies", "Grounding spiritual insights", "Trusting your intuition"],
    8: ["Using power ethically", "Balancing material and spiritual", "Delegating effectively", "Managing workaholic tendencies", "Releasing control"],
    9: ["Setting practical boundaries", "Completing life cycles", "Releasing attachment to outcomes", "Accepting human limitations", "Balancing idealism with reality"],
    11: ["Grounding spiritual insights", "Managing high sensitivity", "Balancing idealism with practicality", "Translating inspiration to action", "Maintaining physical wellbeing"],
    22: ["Manifesting your vision practically", "Managing stress of large responsibilities", "Delegating effectively", "Balancing material mastery with spiritual purpose", "Maintaining personal relationships"],
    33: ["Setting appropriate boundaries", "Avoiding martyr syndrome", "Self-care while serving others", "Receiving as well as giving", "Maintaining personal identity"]
  };
  
  return challengesByNumber[bhagyank] || [
    "Finding your authentic path",
    "Balancing different aspects of life",
    "Trusting your inner guidance",
    "Creating sustainable success",
    "Maintaining physical wellbeing"
  ];
};

/**
 * Determine life lessons based on Bhagyank (Destiny Number)
 */
const determineLifeLessons = (bhagyank: number): string[] => {
  const lessonsByNumber: Record<number, string[]> = {
    1: ["Independence", "Courage", "Self-reliance", "Innovation", "Leadership without domination"],
    2: ["Cooperation", "Patience", "Diplomacy", "Intuitive listening", "Balance in relationships"],
    3: ["Creative expression", "Joy in life", "Effective communication", "Optimism", "Following through on ideas"],
    4: ["Building solid foundations", "Order and system", "Patience in process", "Practical wisdom", "Reliability"],
    5: ["Constructive freedom", "Adaptability", "Learning through experience", "Progressive change", "Versatility"],
    6: ["Responsible love", "Balanced service", "Creating harmony", "Nurturing without control", "Beauty in life"],
    7: ["Inner wisdom", "Spiritual connection", "Analysis and understanding", "Faith and trust", "Sacred knowledge"],
    8: ["Abundance consciousness", "Ethical power", "Material mastery", "Achievement", "Balance of giving and receiving"],
    9: ["Universal compassion", "Selfless service", "Letting go", "Forgiveness", "Higher perspective"],
    11: ["Spiritual awakening", "Inspired leadership", "Heightened intuition", "Illuminating others", "Idealism with practicality"],
    22: ["Manifesting visions", "Master building", "Practical spirituality", "Large-scale service", "Material and spiritual integration"],
    33: ["Compassionate teaching", "Spiritual nurturing", "Selfless love", "Higher awareness", "Healing through presence"]
  };
  
  return lessonsByNumber[bhagyank] || [
    "Finding your authentic path",
    "Balancing material and spiritual",
    "Service with boundaries",
    "Self-knowledge",
    "Living your highest potential"
  ];
};

/**
 * Determine lucky colors based on Bhagyank (Destiny Number)
 */
const determineLuckyColors = (bhagyank: number): string[] => {
  const colorsByNumber: Record<number, string[]> = {
    1: ["Red", "Orange", "Gold", "Yellow", "Bronze"],
    2: ["Green", "White", "Cream", "Silver", "Peach"],
    3: ["Yellow", "Bright Pink", "Magenta", "Peach", "Lilac"],
    4: ["Green", "Blue", "Brown", "Grey", "Navy"],
    5: ["Light Blue", "Silver", "White", "Gray", "Turquoise"],
    6: ["Pink", "Blue", "Cream", "Peach", "Lavender"],
    7: ["Purple", "Violet", "Silver", "White", "Pastel Blue"],
    8: ["Purple", "Dark Blue", "Green", "Gold", "Metallic tones"],
    9: ["Gold", "Red", "Orange", "Rose", "Purple"],
    11: ["White", "Ivory", "Silver", "Pale Blue", "Lavender"],
    22: ["Blue", "Gold", "Yellow", "Orange", "Brown"],
    33: ["Pink", "Turquoise", "Light Purple", "White", "Aquamarine"]
  };
  
  return colorsByNumber[bhagyank] || ["Blue", "Purple", "Gold", "Green", "White"];
};

/**
 * Determine lucky gemstones based on Bhagyank (Destiny Number)
 */
const determineLuckyGemstones = (bhagyank: number): string[] => {
  const gemstonesByNumber: Record<number, string[]> = {
    1: ["Ruby", "Garnet", "Red Jasper", "Carnelian", "Sunstone"],
    2: ["Moonstone", "Pearl", "Opal", "Rose Quartz", "Selenite"],
    3: ["Yellow Sapphire", "Citrine", "Amber", "Topaz", "Yellow Jade"],
    4: ["Sapphire", "Lapis Lazuli", "Emerald", "Jade", "Green Tourmaline"],
    5: ["Aquamarine", "Turquoise", "Light Amethyst", "Blue Lace Agate", "Sodalite"],
    6: ["Emerald", "Pink Tourmaline", "Rose Quartz", "Pink Sapphire", "Jade"],
    7: ["Amethyst", "Purple Fluorite", "Charoite", "Clear Quartz", "Lepidolite"],
    8: ["Diamond", "Blue Sapphire", "Lapis Lazuli", "Indigo Tourmaline", "Onyx"],
    9: ["Red Coral", "Ruby", "Garnet", "Rhodonite", "Red Jasper"],
    11: ["Clear Quartz", "Selenite", "Herkimer Diamond", "Labradorite", "Moonstone"],
    22: ["Amber", "Yellow Citrine", "Blue Sapphire", "Golden Topaz", "Azurite"],
    33: ["Pink Tourmaline", "Kunzite", "Rose Quartz", "Pink Opal", "Pink Sapphire"]
  };
  
  return gemstonesByNumber[bhagyank] || ["Clear Quartz", "Amethyst", "Rose Quartz", "Citrine", "Jade"];
};

