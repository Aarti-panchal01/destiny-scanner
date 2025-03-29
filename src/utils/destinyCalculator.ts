
/**
 * Calculates the destiny number based on a birth date
 * In numerology, the destiny number is calculated by adding all digits in a birth date
 * and reducing to a single digit (except for master numbers 11, 22, and 33)
 */
export const calculateDestinyNumber = (birthDate: Date): number => {
  // Format date as MMDDYYYY
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // Month is 0-indexed
  const year = birthDate.getFullYear();
  
  // Convert to string and remove any non-digit characters
  const dateString = `${month}${day}${year}`;
  
  // Sum all digits
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
  
  return sum;
};

/**
 * Returns the meaning of a destiny number
 */
export const getDestinyMeaning = (destinyNumber: number): string => {
  const meanings: Record<number, string> = {
    1: "You are a natural born leader with strong independence and creativity. Your path involves pioneering new ideas and taking initiative.",
    2: "You are diplomatic and cooperative, with a gift for harmony and balance. Your destiny involves partnerships, relationships, and bringing peace.",
    3: "You have natural creative talents and charisma. Your destiny involves self-expression, joy, and inspiring others through your creativity.",
    4: "You are practical, organized, and hardworking. Your destiny involves building stable foundations and finding order in chaos.",
    5: "You seek freedom, adventure, and change. Your destiny involves versatility, adaptability, and embracing new experiences.",
    6: "You are nurturing, responsible, and compassionate. Your destiny involves caregiving, creating harmony, and service to others.",
    7: "You have a deeply analytical and spiritual mind. Your destiny involves seeking knowledge, wisdom, and understanding life's mysteries.",
    8: "You have natural leadership and business acumen. Your destiny involves achievement, authority, and material success.",
    9: "You are compassionate, idealistic, and humanitarian. Your destiny involves serving humanity and completing important life cycles.",
    11: "As a master number, you have heightened intuition and spiritual insight. Your destiny involves illumination and inspiring others.",
    22: "As a master number, you are a master builder. Your destiny involves creating large-scale projects that benefit humanity.",
    33: "As a master number, you are a master teacher. Your destiny involves selfless service, spiritual enlightenment, and uplifting humanity."
  };
  
  return meanings[destinyNumber] || "This number holds unique spiritual significance for you. Trust your intuition to guide your path.";
};

/**
 * Returns a list of traits associated with a destiny number
 */
export const getDestinyTraits = (destinyNumber: number): string[] => {
  const traits: Record<number, string[]> = {
    1: ["Independent", "Leader", "Ambitious", "Original", "Pioneer"],
    2: ["Cooperative", "Diplomatic", "Patient", "Sensitive", "Harmonious"],
    3: ["Creative", "Expressive", "Social", "Inspirational", "Optimistic"],
    4: ["Practical", "Organized", "Reliable", "Disciplined", "Methodical"],
    5: ["Adaptable", "Freedom-loving", "Versatile", "Adventurous", "Progressive"],
    6: ["Responsible", "Loving", "Supportive", "Nurturing", "Balanced"],
    7: ["Analytical", "Spiritual", "Wise", "Intuitive", "Introspective"],
    8: ["Ambitious", "Executive", "Authoritative", "Successful", "Confident"],
    9: ["Compassionate", "Humanitarian", "Selfless", "Artistic", "Idealistic"],
    11: ["Intuitive", "Inspirational", "Visionary", "Idealistic", "Sensitive"],
    22: ["Practical", "Visionary", "Ambitious", "Disciplined", "Masterful"],
    33: ["Altruistic", "Nurturing", "Enlightened", "Compassionate", "Inspirational"]
  };
  
  return traits[destinyNumber] || ["Unique", "Spiritual", "Intuitive", "Mystical", "Guided"];
};
