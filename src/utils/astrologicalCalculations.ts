/**
 * Calculate astrological details based on birth date, time, and location
 */
export const calculateAstrologicalDetails = (
  birthDate: Date, 
  birthTime?: string, 
  birthLocation?: string
) => {
  // In a real implementation, this would use sophisticated astronomical calculations
  // For now, we'll use simplified calculations based on the birth date
  
  // Calculate sun sign
  const sunSign = calculateSunSign(birthDate);
  
  // Calculate moon sign (simplified version)
  const moonSign = calculateMoonSign(birthDate, birthTime);
  
  // Calculate ascendant (simplified version)
  const ascendant = calculateAscendant(birthDate, birthTime, birthLocation);
  
  // Calculate planetary influence
  const planetaryInfluence = calculatePlanetaryInfluence(birthDate, birthTime, birthLocation);
  
  // Calculate daily mantra
  const dailyMantra = generateDailyMantra(sunSign.name);
  
  // Generate past life influences
  const pastLifeInfluences = generatePastLifeInfluences(sunSign.name, moonSign.name);
  
  // Generate karmic lessons
  const karmicLessons = generateKarmicLessons(sunSign.name, ascendant.name);
  
  return {
    sunSign,
    moonSign,
    ascendant,
    planetaryInfluence,
    dailyMantra,
    pastLifeInfluences,
    karmicLessons
  };
};

// Helper functions
const calculateSunSign = (birthDate: Date) => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  // Simplified sun sign calculation
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      name: 'Aries',
      symbol: '♈',
      element: 'Fire',
      quality: 'Cardinal',
      rulingPlanet: 'Mars',
      strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
      weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
      luckyColors: ['Red', 'White'],
      luckyGemstones: ['Diamond', 'Ruby']
    };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      name: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      quality: 'Fixed',
      rulingPlanet: 'Venus',
      strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
      weaknesses: ['Stubborn', 'Possessive', 'Uncompromising'],
      luckyColors: ['Green', 'Pink'],
      luckyGemstones: ['Emerald', 'Rose Quartz']
    };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      name: 'Gemini',
      symbol: '♊',
      element: 'Air',
      quality: 'Mutable',
      rulingPlanet: 'Mercury',
      strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Ability to learn quickly and exchange ideas'],
      weaknesses: ['Nervous', 'Inconsistent', 'Indecisive'],
      luckyColors: ['Light-Green', 'Yellow'],
      luckyGemstones: ['Agate']
    };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      name: 'Cancer',
      symbol: '♋',
      element: 'Water',
      quality: 'Cardinal',
      rulingPlanet: 'Moon',
      strengths: ['Tenacious', 'Highly imaginative', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive'],
      weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
      luckyColors: ['White'],
      luckyGemstones: ['Pearl']
    };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: 'Leo',
      symbol: '♌',
      element: 'Fire',
      quality: 'Fixed',
      rulingPlanet: 'Sun',
      strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
      weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy', 'Inflexible'],
      luckyColors: ['Gold'],
      luckyGemstones: ['Ruby']
    };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      name: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      quality: 'Mutable',
      rulingPlanet: 'Mercury',
      strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical'],
      weaknesses: ['Shyness', 'Worry', 'Overcritical of self and others', 'All work and no play'],
      luckyColors: ['Grey', 'Beige'],
      luckyGemstones: ['Sapphire']
    };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      name: 'Libra',
      symbol: '♎',
      element: 'Air',
      quality: 'Cardinal',
      rulingPlanet: 'Venus',
      strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
      weaknesses: ['Indecisive', 'Avoids confrontations', 'Will carry a grudge', 'Self-pity'],
      luckyColors: ['Pink', 'Green'],
      luckyGemstones: ['Opal']
    };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      name: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      quality: 'Fixed',
      rulingPlanet: 'Pluto',
      strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'A true friend'],
      weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
      luckyColors: ['Scarlet'],
      luckyGemstones: ['Topaz']
    };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      name: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      quality: 'Mutable',
      rulingPlanet: 'Jupiter',
      strengths: ['Generous', 'Idealistic', 'Great sense of humor'],
      weaknesses: ['Promises more than can deliver', 'Very impatient', 'Will say anything no matter how undiplomatic'],
      luckyColors: ['Blue'],
      luckyGemstones: ['Turquoise']
    };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      name: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      quality: 'Cardinal',
      rulingPlanet: 'Saturn',
      strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
      weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Expecting the worst'],
      luckyColors: ['Brown', 'Grey'],
      luckyGemstones: ['Garnet']
    };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      name: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      quality: 'Fixed',
      rulingPlanet: 'Uranus',
      strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
      weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising', 'Aloof'],
      luckyColors: ['Blue'],
      luckyGemstones: ['Amethyst']
    };
  } else {
    // Default fallback
    return {
      name: 'Pisces',
      symbol: '♓',
      element: 'Water',
      quality: 'Mutable',
      rulingPlanet: 'Neptune',
      strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
      weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality'],
      luckyColors: ['Sea Green', 'Aqua'],
      luckyGemstones: ['Aquamarine', 'Amethyst']
    };
  }
};

const calculateMoonSign = (birthDate: Date, birthTime?: string) => {
  // In a real implementation, this would require precise birth time and complex calculations
  // For now, we'll return a simplified/random result
  
  const moonSigns = [
    { name: 'Aries', qualities: ['Emotionally impulsive', 'Quick to react', 'Passionate'], element: 'Fire' },
    { name: 'Taurus', qualities: ['Emotionally stable', 'Security-focused', 'Sensual'], element: 'Earth' },
    { name: 'Gemini', qualities: ['Emotionally expressive', 'Adaptable', 'Curious'], element: 'Air' },
    { name: 'Cancer', qualities: ['Deeply emotional', 'Nurturing', 'Memory-oriented'], element: 'Water' },
    { name: 'Leo', qualities: ['Warm-hearted', 'Proud', 'Emotionally dramatic'], element: 'Fire' },
    { name: 'Virgo', qualities: ['Analytically emotional', 'Detail-oriented', 'Service-minded'], element: 'Earth' },
    { name: 'Libra', qualities: ['Harmonious emotions', 'Partnership-focused', 'Diplomatic'], element: 'Air' },
    { name: 'Scorpio', qualities: ['Intense emotions', 'Transformative', 'Deep'], element: 'Water' },
    { name: 'Sagittarius', qualities: ['Optimistic emotions', 'Freedom-loving', 'Philosophical'], element: 'Fire' },
    { name: 'Capricorn', qualities: ['Reserved emotions', 'Responsible', 'Achievement-oriented'], element: 'Earth' },
    { name: 'Aquarius', qualities: ['Intellectualized emotions', 'Humanitarian', 'Inventive'], element: 'Air' },
    { name: 'Pisces', qualities: ['Compassionate emotions', 'Mystical', 'Artistic'], element: 'Water' }
  ];
  
  // Simplified moon sign calculation based on birth month
  // In a real implementation, this would be much more complex
  const moonSignIndex = birthDate.getMonth();
  return moonSigns[moonSignIndex];
};

const calculateAscendant = (birthDate: Date, birthTime?: string, birthLocation?: string) => {
  // In a real implementation, this would require precise birth time and location for complex calculations
  // For now, we'll return a simplified/random result
  
  const ascendants = [
    { name: 'Aries', traits: ['Bold appearance', 'Direct approach', 'Physical energy'], element: 'Fire' },
    { name: 'Taurus', traits: ['Steady demeanor', 'Calm presence', 'Sensual appearance'], element: 'Earth' },
    { name: 'Gemini', traits: ['Quick movements', 'Expressive face', 'Communicative presence'], element: 'Air' },
    { name: 'Cancer', traits: ['Nurturing presence', 'Receptive demeanor', 'Protective nature'], element: 'Water' },
    { name: 'Leo', traits: ['Dramatic entrance', 'Confident bearing', 'Regal presence'], element: 'Fire' },
    { name: 'Virgo', traits: ['Precise movements', 'Analytical expression', 'Helpful demeanor'], element: 'Earth' },
    { name: 'Libra', traits: ['Graceful appearance', 'Diplomatic approach', 'Charming presence'], element: 'Air' },
    { name: 'Scorpio', traits: ['Magnetic presence', 'Penetrating gaze', 'Mysterious aura'], element: 'Water' },
    { name: 'Sagittarius', traits: ['Enthusiastic approach', 'Open expression', 'Adventurous bearing'], element: 'Fire' },
    { name: 'Capricorn', traits: ['Dignified appearance', 'Responsible demeanor', 'Reserved presence'], element: 'Earth' },
    { name: 'Aquarius', traits: ['Unique style', 'Friendly detachment', 'Progressive attitude'], element: 'Air' },
    { name: 'Pisces', traits: ['Gentle presence', 'Dreamy eyes', 'Compassionate demeanor'], element: 'Water' }
  ];
  
  // Without proper birth time and location, we'll provide a simplified result
  // In a real application, we'd use astronomical calculations
  let ascendantIndex = (birthDate.getDate() % 12);
  
  // If birth time is provided, we can slightly improve accuracy
  if (birthTime) {
    const hour = parseInt(birthTime.split(':')[0]);
    ascendantIndex = (ascendantIndex + hour) % 12;
  }
  
  return ascendants[ascendantIndex];
};

const calculatePlanetaryInfluence = (birthDate: Date, birthTime?: string, birthLocation?: string): { dominantPlanet: string; influence: string } => {
  // In a real implementation, this would require precise birth time and location for complex calculations
  // For now, we'll return a simplified result based on the Sun sign's ruling planet
  const sunSign = calculateSunSign(birthDate);
  
  const planetaryInfluences: Record<string, { dominantPlanet: string; influence: string }> = {
    'Aries': { dominantPlanet: 'Mars', influence: 'Energetic and assertive, driving you to take action and pursue your goals with passion.' },
    'Taurus': { dominantPlanet: 'Venus', influence: 'Sensual and grounded, attracting beauty and abundance into your life.' },
    'Gemini': { dominantPlanet: 'Mercury', influence: 'Communicative and adaptable, facilitating learning and connection with others.' },
    'Cancer': { dominantPlanet: 'Moon', influence: 'Emotional and nurturing, guiding you to create a safe and comforting environment.' },
    'Leo': { dominantPlanet: 'Sun', influence: 'Creative and confident, inspiring you to express your unique talents and lead with warmth.' },
    'Virgo': { dominantPlanet: 'Mercury', influence: 'Analytical and detail-oriented, helping you to refine and perfect your skills.' },
    'Libra': { dominantPlanet: 'Venus', influence: 'Harmonious and diplomatic, encouraging you to seek balance and create beauty in your relationships.' },
    'Scorpio': { dominantPlanet: 'Pluto', influence: 'Transformative and intense, empowering you to delve deep and uncover hidden truths.' },
    'Sagittarius': { dominantPlanet: 'Jupiter', influence: 'Optimistic and expansive, inspiring you to explore new horizons and seek wisdom.' },
    'Capricorn': { dominantPlanet: 'Saturn', influence: 'Disciplined and responsible, guiding you to build lasting structures and achieve your goals.' },
    'Aquarius': { dominantPlanet: 'Uranus', influence: 'Innovative and independent, encouraging you to break free from limitations and embrace change.' },
    'Pisces': { dominantPlanet: 'Neptune', influence: 'Compassionate and intuitive, connecting you to the mystical realms and inspiring your creativity.' }
  };
  
  return planetaryInfluences[sunSign.name] || { dominantPlanet: 'Cosmic Forces', influence: 'Multiple celestial influences work together in your chart, creating a unique cosmic signature.' };
};

const generateDailyMantra = (sunSign: string): string => {
  const mantras: Record<string, string[]> = {
    'Aries': [
      'I embrace my courage and forge my own path today',
      'My passion fuels my purpose and ignites my spirit',
      'I am a pioneer of new beginnings and fresh opportunities'
    ],
    'Taurus': [
      'I honor my worth and attract abundance into my life',
      'I am grounded in stability and open to life\'s pleasures',
      'My patience and persistence create lasting results'
    ],
    'Gemini': [
      'My curious mind opens doors to new perspectives today',
      'I communicate with clarity and listen with understanding',
      'I embrace the duality of my nature and find balance within'
    ],
    'Cancer': [
      'I nurture myself as I care for others',
      'My intuition guides me to where I need to be',
      'I honor my emotions as messengers of my inner wisdom'
    ],
    'Leo': [
      'My inner light shines brightly, inspiring others',
      'I create with joy and express myself authentically',
      'I lead with an open heart and generous spirit'
    ],
    'Virgo': [
      'I transform ordinary moments into sacred experiences',
      'My attention to detail reveals the perfection in all things',
      'I serve with purpose and grow through practical wisdom'
    ],
    'Libra': [
      'I balance giving and receiving in all my relationships',
      'I create harmony within and witness it manifest without',
      'My decisions align with my highest values and create beauty'
    ],
    'Scorpio': [
      'I transform challenges into opportunities for rebirth',
      'I embrace my power and use it with compassion',
      'My intensity fuels my passion and deepens my connections'
    ],
    'Sagittarius': [
      'I expand my horizons and follow my vision with enthusiasm',
      'My optimism creates adventures worth experiencing',
      'I seek truth and wisdom in everyday experiences'
    ],
    'Capricorn': [
      'I climb mountains with determination and patience',
      'My discipline creates structures that support my growth',
      'I honor both tradition and innovation in my journey'
    ],
    'Aquarius': [
      'I bring innovation to everything I touch today',
      'My unique perspective contributes to the collective good',
      'I embrace my individuality while honoring my connection to all'
    ],
    'Pisces': [
      'I flow with the currents of life, trusting divine timing',
      'My compassion heals myself and others',
      'I merge with the infinite while dancing in the finite'
    ]
  };
  
  const signMantras = mantras[sunSign] || [
    'I am aligned with my highest purpose today',
    'I trust the unfolding of my cosmic journey',
    'My unique gifts serve the greater good'
  ];
  
  // Return a random mantra from the array
  return signMantras[Math.floor(Math.random() * signMantras.length)];
};

const generatePastLifeInfluences = (sunSign: string, moonSign: string): string[] => {
  const generalInfluences = [
    'Ancient knowledge of healing arts that manifests as intuitive health insights',
    'Leadership role in a spiritual community that gives you natural teaching abilities',
    'Artistic mastery from a creative lifetime that emerges in your current creative expressions',
    'Deep connection to nature and elements from indigenous lifetime'
  ];
  
  const sunSignInfluences: Record<string, string> = {
    'Aries': 'Warrior energy from past battles that now manifests as courage and initiative',
    'Taurus': 'Connection to the land and agriculture that gives you patience and appreciation for beauty',
    'Gemini': 'Role as messenger or scribe that enhances your communication abilities',
    'Cancer': 'Tribal or family leadership that strengthens your nurturing instincts',
    'Leo': 'Royal or noble position that gives you natural leadership qualities',
    'Virgo': 'Healing or service role that enhances your attention to detail and helpfulness',
    'Libra': 'Diplomatic or judicial position that strengthens your sense of fairness',
    'Scorpio': 'Mystical initiation or transformation that deepens your emotional intensity',
    'Sagittarius': 'Explorer or philosopher role that expands your search for meaning',
    'Capricorn': 'Builder or architect position that enhances your discipline and structure',
    'Aquarius': 'Revolutionary or inventor role that strengthens your innovative thinking',
    'Pisces': 'Spiritual or artistic position that deepens your compassion and creativity'
  };
  
  const moonSignInfluences: Record<string, string> = {
    'Aries': 'Passionate emotional expression from a fiery past life experience',
    'Taurus': 'Emotional security needs from times of material uncertainty',
    'Gemini': 'Adaptable emotional nature from lives requiring mental flexibility',
    'Cancer': 'Deep nurturing instincts from multiple maternal/paternal roles',
    'Leo': 'Dramatic emotional expression from performance or leadership roles',
    'Virgo': 'Analytical approach to feelings from lives of service and precision',
    'Libra': 'Harmonious emotional needs from diplomatic or peace-making roles',
    'Scorpio': 'Transformative emotional patterns from lives of intense experiences',
    'Sagittarius': 'Optimistic emotional outlook from philosophical or teaching roles',
    'Capricorn': 'Reserved emotional expression from lives requiring self-discipline',
    'Aquarius': 'Detached emotional processing from lives of humanitarian service',
    'Pisces': 'Compassionate emotional nature from spiritual or healing roles'
  };
  
  const sunInfluence = sunSignInfluences[sunSign] || 'Past life experiences that align with your soul purpose and identity';
  const moonInfluence = moonSignInfluences[moonSign] || 'Emotional patterns carried from previous incarnations that shape your instinctive responses';
  
  return [sunInfluence, moonInfluence, ...generalInfluences.slice(0, 2)];
};

const generateKarmicLessons = (sunSign: string, ascendantSign: string): string[] => {
  const generalLessons = [
    'Learning to balance spiritual knowledge with practical application',
    'Developing patience with those who don\'t share your vision',
    'Finding your voice and expressing your truth without fear',
    'Letting go of perfectionism and embracing the beauty of imperfection'
  ];
  
  const sunSignLessons: Record<string, string> = {
    'Aries': 'Learning patience and considering others before taking action',
    'Taurus': 'Releasing attachment to material possessions and finding security within',
    'Gemini': 'Developing depth in knowledge rather than scattered information',
    'Cancer': 'Setting healthy emotional boundaries and avoiding codependency',
    'Leo': 'Balancing self-expression with genuine interest in others',
    'Virgo': 'Releasing critical perfectionism and embracing natural flow',
    'Libra': 'Making decisions independently without excessive external input',
    'Scorpio': 'Transforming control issues into collaborative power',
    'Sagittarius': 'Grounding philosophical ideas into practical wisdom',
    'Capricorn': 'Finding joy and play amidst responsibility and work',
    'Aquarius': 'Connecting intellectual ideals with emotional reality',
    'Pisces': 'Establishing boundaries while maintaining compassion'
  };
  
  const ascendantLessons: Record<string, string> = {
    'Aries': 'Tempering impulsivity with thoughtful consideration',
    'Taurus': 'Embracing necessary change despite comfort with stability',
    'Gemini': 'Developing focus and follow-through on important projects',
    'Cancer': 'Stepping into leadership without hiding behind protection',
    'Leo': 'Sharing the spotlight and supporting others\' success',
    'Virgo': 'Trusting intuition alongside analytical thinking',
    'Libra': 'Standing firm in personal truth when conflict arises',
    'Scorpio': 'Opening to vulnerability instead of maintaining protection',
    'Sagittarius': 'Attending to important details rather than just the big picture',
    'Capricorn': 'Allowing emotional expression alongside practical action',
    'Aquarius': 'Creating intimate connections despite independence',
    'Pisces': 'Establishing clear boundaries and practical structures'
  };
  
  const sunLesson = sunSignLessons[sunSign] || 'Integrating your essential nature with higher purpose';
  const ascendantLesson = ascendantLessons[ascendantSign] || 'Balancing your outward approach with inner wisdom';
  
  return [sunLesson, ascendantLesson, ...generalLessons.slice(0, 2)];
};

const getSunSignSymbol = (sign: string): string => {
  const symbols: Record<string, string> = {
    "Aries": "♈",
    "Taurus": "♉",
    "Gemini": "♊",
    "Cancer": "♋", 
    "Leo": "♌",
    "Virgo": "♍",
    "Libra": "♎",
    "Scorpio": "♏",
    "Sagittarius": "♐",
    "Capricorn": "♑",
    "Aquarius": "♒",
    "Pisces": "♓"
  };
  return symbols[sign] || "";
};
