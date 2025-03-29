
interface ZodiacInfo {
  name: string;
  dateRange: string;
  element: string;
  elementDescription: string;
  rulingPlanet: string;
  traits: string[];
  challenges: string;
  lifePathFocus: string;
}

export const getZodiacSign = (birthDate: Date): ZodiacInfo => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // JavaScript months are 0-indexed
  
  // Determine zodiac sign based on month and day
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      name: "Aries (The Ram)",
      dateRange: "March 21 - April 19",
      element: "Fire",
      elementDescription: "Passionate, dynamic, and temperamental",
      rulingPlanet: "Mars",
      traits: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic", "Honest"],
      challenges: "Impatience and impulsiveness. Take time to consider consequences before acting.",
      lifePathFocus: "Self-discovery and pioneering new paths. Your natural leadership should be channeled constructively."
    };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      name: "Taurus (The Bull)",
      dateRange: "April 20 - May 20",
      element: "Earth",
      elementDescription: "Practical, grounded, and reliable",
      rulingPlanet: "Venus",
      traits: ["Reliable", "Patient", "Practical", "Devoted", "Responsible", "Stable"],
      challenges: "Resistance to change and stubbornness. Practice flexibility and openness to new ideas.",
      lifePathFocus: "Building security and creating lasting value. Your persistence will help you create enduring foundations."
    };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      name: "Gemini (The Twins)",
      dateRange: "May 21 - June 20",
      element: "Air",
      elementDescription: "Intellectual, communicative, and adaptable",
      rulingPlanet: "Mercury",
      traits: ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick-witted", "Versatile"],
      challenges: "Inconsistency and nervousness. Focus on following through with projects and grounding your energy.",
      lifePathFocus: "Communication and versatility. Your ability to connect with others helps bridge different worlds."
    };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      name: "Cancer (The Crab)",
      dateRange: "June 21 - July 22",
      element: "Water",
      elementDescription: "Emotional, intuitive, and deeply feeling",
      rulingPlanet: "Moon",
      traits: ["Tenacious", "Highly Imaginative", "Loyal", "Emotional", "Sympathetic", "Nurturing"],
      challenges: "Moodiness and clinging to the past. Practice emotional release and moving forward.",
      lifePathFocus: "Emotional security and nurturing others. Your intuition helps you support those around you."
    };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: "Leo (The Lion)",
      dateRange: "July 23 - August 22",
      element: "Fire",
      elementDescription: "Passionate, creative, and generous",
      rulingPlanet: "Sun",
      traits: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful", "Humorous"],
      challenges: "Arrogance and inflexibility. Balance confidence with humility and consideration of others.",
      lifePathFocus: "Self-expression and leadership. Your charisma naturally draws others to your light."
    };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      name: "Virgo (The Maiden)",
      dateRange: "August 23 - September 22",
      element: "Earth",
      elementDescription: "Analytical, practical, and attentive to detail",
      rulingPlanet: "Mercury",
      traits: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical", "Detail-oriented"],
      challenges: "Perfectionism and overcritical thinking. Embrace imperfection and be gentle with yourself.",
      lifePathFocus: "Service and improvement. Your attention to detail helps you refine and perfect systems."
    };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      name: "Libra (The Scales)",
      dateRange: "September 23 - October 22",
      element: "Air",
      elementDescription: "Diplomatic, fair-minded, and social",
      rulingPlanet: "Venus",
      traits: ["Diplomatic", "Fair-minded", "Social", "Cooperative", "Gracious", "Peace-loving"],
      challenges: "Indecisiveness and avoidance of conflict. Practice making decisions and addressing issues directly.",
      lifePathFocus: "Harmony and relationships. Your diplomatic nature helps create balance and fairness."
    };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      name: "Scorpio (The Scorpion)",
      dateRange: "October 23 - November 21",
      element: "Water",
      elementDescription: "Passionate, resourceful, and mysterious",
      rulingPlanet: "Pluto, Mars",
      traits: ["Resourceful", "Passionate", "Intuitive", "Determined", "Magnetic", "Investigative"],
      challenges: "Jealousy and secretiveness. Practice trust and emotional transparency.",
      lifePathFocus: "Transformation and depth. Your intensity helps you uncover hidden truths and facilitate change."
    };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      name: "Sagittarius (The Archer)",
      dateRange: "November 22 - December 21",
      element: "Fire",
      elementDescription: "Adventurous, optimistic, and freedom-loving",
      rulingPlanet: "Jupiter",
      traits: ["Generous", "Idealistic", "Philosophical", "Optimistic", "Enthusiastic", "Honest"],
      challenges: "Restlessness and tactlessness. Practice focus and diplomatic communication.",
      lifePathFocus: "Exploration and expansion. Your philosophical nature leads you to seek higher meaning."
    };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      name: "Capricorn (The Goat)",
      dateRange: "December 22 - January 19",
      element: "Earth",
      elementDescription: "Disciplined, responsible, and practical",
      rulingPlanet: "Saturn",
      traits: ["Responsible", "Disciplined", "Self-controlled", "Persistent", "Cautious", "Practical"],
      challenges: "Pessimism and rigidity. Balance work with play and embrace flexibility.",
      lifePathFocus: "Achievement and mastery. Your determination helps you climb to great heights."
    };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      name: "Aquarius (The Water Bearer)",
      dateRange: "January 20 - February 18",
      element: "Air",
      elementDescription: "Progressive, original, and independent",
      rulingPlanet: "Uranus, Saturn",
      traits: ["Progressive", "Original", "Independent", "Humanitarian", "Inventive", "Logical"],
      challenges: "Emotional detachment and stubbornness. Connect with your feelings and remain open to others' views.",
      lifePathFocus: "Innovation and community. Your visionary thinking helps create positive social change."
    };
  } else {
    return {
      name: "Pisces (The Fish)",
      dateRange: "February 19 - March 20",
      element: "Water",
      elementDescription: "Compassionate, artistic, and deeply intuitive",
      rulingPlanet: "Neptune, Jupiter",
      traits: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise", "Musical"],
      challenges: "Escapism and victim mentality. Ground yourself in reality and take responsibility for your path.",
      lifePathFocus: "Spiritual connection and creative expression. Your sensitivity helps you tap into universal energies."
    };
  }
};
