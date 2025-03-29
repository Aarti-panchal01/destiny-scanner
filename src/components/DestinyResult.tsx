
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDestinyMeaning, getDestinyTraits } from "@/utils/destinyCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSimilarCelebrities } from "@/utils/apiService";
import { NumerologyProfile } from "@/utils/numerologyCalculator";
import { Heart, Brain, Palmtree, Star, User, Coins, Award, ArrowUpDown, CalendarDays, BadgePercent } from "lucide-react";

interface PalmFeatures {
  lifeLineLength?: number;
  lifeLineClarity?: number;
  heartLineStrength?: number;
  headLineDepth?: number;
  fateLinePresence?: boolean;
  dominantMount?: string;
  fingerRatio?: number[];
  specialMarks?: {
    type: string;
    meaning: string;
    location: string;
  }[];
}

interface DestinyResultProps {
  destinyNumber: number;
  isVisible: boolean;
  palmFeatures?: PalmFeatures | null;
  additionalInsights?: string[];
  compatibleNumbers?: number[];
  numerologyProfile?: NumerologyProfile;
  specialTraits?: string[];
  palmInsights?: string[];
  dailyForecast?: string;
  luckyDates?: string[];
}

const DestinyResult = ({ 
  destinyNumber, 
  isVisible,
  palmFeatures,
  additionalInsights,
  compatibleNumbers,
  numerologyProfile,
  specialTraits,
  palmInsights,
  dailyForecast,
  luckyDates
}: DestinyResultProps) => {
  const meaning = getDestinyMeaning(destinyNumber);
  const traits = getDestinyTraits(destinyNumber);
  const [similarCelebrities, setSimilarCelebrities] = useState<string[]>([]);
  const [isCelebritiesLoading, setIsCelebritiesLoading] = useState(false);

  // Fetch celebrities with similar destiny numbers
  useEffect(() => {
    if (isVisible && destinyNumber) {
      const fetchCelebrities = async () => {
        setIsCelebritiesLoading(true);
        try {
          const celebrities = await getSimilarCelebrities(destinyNumber);
          setSimilarCelebrities(celebrities);
        } catch (error) {
          console.error("Error fetching similar celebrities:", error);
        } finally {
          setIsCelebritiesLoading(false);
        }
      };
      
      fetchCelebrities();
    }
  }, [isVisible, destinyNumber]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="cosmic-card max-w-4xl mx-auto p-6 md:p-8 mb-16"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 15,
                delay: 0.2
              }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-gold mb-4"
            >
              <span className="text-4xl font-bold text-white">{destinyNumber}</span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-cosmic-light-purple mb-2">
              Your Cosmic Blueprint
            </h2>
            <p className="text-cosmic-light-purple/70">
              This sacred number reveals your destiny path and life purpose
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-cosmic-dark/40 border border-cosmic-purple/20">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <Star className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="personality"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <User className="mr-2 h-4 w-4" />
                Personality
              </TabsTrigger>
              <TabsTrigger 
                value="palmreading"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <Palmtree className="mr-2 h-4 w-4" />
                Palm Reading
              </TabsTrigger>
              <TabsTrigger 
                value="daily"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Daily Insights
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Your Destiny Meaning</h3>
                <p className="text-cosmic-light-purple/90 leading-relaxed">
                  {meaning}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Key Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="px-3 py-1 rounded-full bg-cosmic-purple/30 text-cosmic-light-purple"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Display additional insights if available */}
              {additionalInsights && additionalInsights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Destiny Insights</h3>
                  <ul className="list-disc list-inside space-y-2 text-cosmic-light-purple/90">
                    {additionalInsights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {/* Show compatibility if available */}
              {compatibleNumbers && compatibleNumbers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Compatible Numbers</h3>
                  <div className="flex flex-wrap gap-2">
                    {compatibleNumbers.map((num, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cosmic-gold/20 text-cosmic-gold font-medium"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-cosmic-light-purple/70">
                    These numbers resonate harmoniously with your destiny vibration
                  </p>
                </motion.div>
              )}
              
              {/* Show celebrities with same destiny number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Celebrities With Your Destiny Number</h3>
                {isCelebritiesLoading ? (
                  <p className="text-cosmic-light-purple/70">Loading celebrity matches...</p>
                ) : similarCelebrities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {similarCelebrities.map((celebrity, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-cosmic-dark/30 p-2 rounded-md border border-cosmic-purple/20"
                      >
                        <Award className="h-4 w-4 text-cosmic-gold" />
                        <span className="text-cosmic-light-purple">{celebrity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cosmic-light-purple/70">No celebrity matches found</p>
                )}
              </motion.div>
            </TabsContent>
            
            {/* Personality Tab */}
            <TabsContent value="personality" className="space-y-6">
              {numerologyProfile ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-cosmic-dark/30 p-4 rounded-lg border border-cosmic-purple/20">
                      <h3 className="text-lg text-cosmic-gold mb-2 font-medium">Mulank (Root Number): {numerologyProfile.mulank.number}</h3>
                      <p className="text-cosmic-light-purple/90 text-sm mb-2">{numerologyProfile.mulank.meaning}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {numerologyProfile.mulank.traits.map((trait, index) => (
                          <span key={index} className="bg-cosmic-purple/20 px-2 py-0.5 rounded-full text-xs text-cosmic-light-purple">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-cosmic-dark/30 p-4 rounded-lg border border-cosmic-purple/20">
                      <h3 className="text-lg text-cosmic-gold mb-2 font-medium">Bhagyank (Destiny Number): {numerologyProfile.bhagyank.number}</h3>
                      <p className="text-cosmic-light-purple/90 text-sm mb-2">{numerologyProfile.bhagyank.meaning}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {numerologyProfile.bhagyank.traits.map((trait, index) => (
                          <span key={index} className="bg-cosmic-purple/20 px-2 py-0.5 rounded-full text-xs text-cosmic-light-purple">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Power Number: {numerologyProfile.powerNumber.number}</h3>
                    <p className="text-cosmic-light-purple/90">{numerologyProfile.powerNumber.meaning}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Ruling Planet: {numerologyProfile.rulingPlanet.name}</h3>
                    <p className="text-cosmic-light-purple/90">{numerologyProfile.rulingPlanet.influence}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Personality Profile</h3>
                    <p className="text-cosmic-light-purple/90 mb-4">{numerologyProfile.personalityOverview}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-lg text-cosmic-light-purple mb-2 flex items-center">
                          <Brain className="h-4 w-4 mr-2 text-cosmic-gold" />
                          Mind & Emotions
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/80 text-sm">
                          {numerologyProfile.lifeLessons.slice(0, 3).map((lesson, index) => (
                            <li key={index}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-cosmic-light-purple mb-2 flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-cosmic-gold" />
                          Relationships
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/80 text-sm">
                          {numerologyProfile.relationshipTraits.slice(0, 3).map((trait, index) => (
                            <li key={index}>{trait}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg text-cosmic-gold mb-3 font-medium flex items-center">
                        <BadgePercent className="h-4 w-4 mr-2" />
                        Career Paths
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {numerologyProfile.careerPaths.map((path, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm"
                          >
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg text-cosmic-gold mb-3 font-medium flex items-center">
                        <Coins className="h-4 w-4 mr-2" />
                        Financial Traits
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/80 text-sm">
                        {numerologyProfile.financialTraits.slice(0, 2).map((trait, index) => (
                          <li key={index}>{trait}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Life Challenges & Lessons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-cosmic-light-purple mb-2">Challenges to Overcome:</h4>
                        <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/80 text-sm">
                          {numerologyProfile.lifeChallenges.slice(0, 3).map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-cosmic-light-purple mb-2">Key Life Lessons:</h4>
                        <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/80 text-sm">
                          {numerologyProfile.lifeLessons.slice(0, 3).map((lesson, index) => (
                            <li key={index}>{lesson}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Lucky Elements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-cosmic-light-purple mb-2">Lucky Colors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {numerologyProfile.luckyColors.map((color, index) => (
                            <div 
                              key={index} 
                              className="flex items-center gap-1 px-2 py-1 rounded-full bg-cosmic-dark/40 border border-cosmic-purple/20"
                            >
                              <span 
                                className="w-3 h-3 rounded-full" 
                                style={{ 
                                  backgroundColor: color.toLowerCase() === "gold" ? "#FFD700" : 
                                              color.toLowerCase() === "silver" ? "#C0C0C0" : 
                                              color
                                }}
                              ></span>
                              <span className="text-xs text-cosmic-light-purple">{color}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-cosmic-light-purple mb-2">Lucky Gemstones:</h4>
                        <div className="flex flex-wrap gap-2">
                          {numerologyProfile.luckyGemstones.map((stone, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 rounded-full bg-cosmic-dark/40 border border-cosmic-purple/20 text-xs text-cosmic-light-purple"
                            >
                              {stone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {specialTraits && specialTraits.length > 0 && (
                    <div>
                      <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Special Cosmic Traits</h3>
                      <div className="bg-cosmic-dark/30 p-4 rounded-lg border border-cosmic-purple/20">
                        {specialTraits.map((trait, index) => (
                          <p key={index} className="text-cosmic-light-purple/90 mb-2">{trait}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-cosmic-light-purple/70">
                    More detailed personality insights are available with enhanced destiny analysis. 
                    Please select "Use Enhanced API Analysis" when scanning your birth date.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Palm Reading Tab */}
            <TabsContent value="palmreading" className="space-y-6">
              {palmFeatures ? (
                <>
                  <div className="p-5 bg-cosmic-dark/40 rounded-lg border border-cosmic-purple/30">
                    <h3 className="text-xl text-cosmic-gold mb-4 font-medium">Palm Reading Analysis</h3>
                    
                    {palmFeatures.dominantMount && (
                      <div className="mb-4">
                        <span className="text-cosmic-light-purple font-medium">Dominant Mount:</span>{" "}
                        <span className="text-cosmic-light-purple/90">{palmFeatures.dominantMount}</span>
                        <p className="text-sm text-cosmic-light-purple/70 mt-1">
                          {palmFeatures.dominantMount === "Venus" && "Indicates creativity, love, and sensuality in your nature"}
                          {palmFeatures.dominantMount === "Jupiter" && "Shows leadership qualities, ambition, and natural authority"}
                          {palmFeatures.dominantMount === "Saturn" && "Reveals wisdom, responsibility, and disciplined nature"}
                          {palmFeatures.dominantMount === "Apollo" && "Signifies artistic talent, recognition, and success orientation"}
                          {palmFeatures.dominantMount === "Mercury" && "Indicates intelligence, communication skills, and adaptability"}
                        </p>
                      </div>
                    )}
                    
                    {palmFeatures.specialMarks && palmFeatures.specialMarks.length > 0 && (
                      <div className="mb-4">
                        <span className="text-cosmic-light-purple font-medium">Special Markings:</span>
                        {palmFeatures.specialMarks.map((mark, index) => (
                          <div key={index} className="mt-2 pl-3 border-l-2 border-cosmic-purple/30">
                            <p className="text-cosmic-light-purple/90">
                              <span className="text-cosmic-gold">{mark.type}</span> on your {mark.location}
                            </p>
                            <p className="text-sm text-cosmic-light-purple/70">
                              Meaning: {mark.meaning}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-cosmic-light-purple mb-3 flex items-center">
                          <Palmtree className="h-4 w-4 mr-2 text-cosmic-gold" />
                          Life & Fate Lines
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-cosmic-light-purple/80">Life Line Strength:</span>
                              <span className="text-sm text-cosmic-gold">
                                {palmFeatures.lifeLineLength ? `${palmFeatures.lifeLineLength}/10` : "N/A"}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-cosmic-dark rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cosmic-gold/70 rounded-full" 
                                style={{ width: `${palmFeatures.lifeLineLength ? palmFeatures.lifeLineLength * 10 : 0}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-cosmic-light-purple/60 mt-1">
                              {palmFeatures.lifeLineLength && palmFeatures.lifeLineLength > 7 ? 
                                "Strong life force and vitality throughout your life journey" :
                                palmFeatures.lifeLineLength && palmFeatures.lifeLineLength > 4 ?
                                "Balanced energy and generally healthy life prospects" :
                                "Focus on quality of life experiences rather than quantity"}
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-cosmic-light-purple/80">Fate Line Presence:</span>
                              <span className="text-sm text-cosmic-gold">
                                {palmFeatures.fateLinePresence ? "Present" : "Faint/Absent"}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-cosmic-dark rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cosmic-purple/70 rounded-full" 
                                style={{ width: palmFeatures.fateLinePresence ? "100%" : "30%" }}
                              ></div>
                            </div>
                            <p className="text-xs text-cosmic-light-purple/60 mt-1">
                              {palmFeatures.fateLinePresence ? 
                                "Strong sense of purpose and destiny in your life path" :
                                "More flexible and self-directed life journey"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-cosmic-light-purple mb-3 flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-cosmic-gold" />
                          Heart & Head Lines
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-cosmic-light-purple/80">Heart Line Strength:</span>
                              <span className="text-sm text-cosmic-gold">
                                {palmFeatures.heartLineStrength ? `${Math.round(palmFeatures.heartLineStrength * 10)}/10` : "N/A"}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-cosmic-dark rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cosmic-gold/70 rounded-full" 
                                style={{ width: `${(palmFeatures.heartLineStrength || 0) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-cosmic-light-purple/60 mt-1">
                              {palmFeatures.heartLineStrength && palmFeatures.heartLineStrength > 0.7 ? 
                                "Deep emotional nature with strong romantic tendencies" :
                                palmFeatures.heartLineStrength && palmFeatures.heartLineStrength > 0.4 ?
                                "Balanced emotional approach to relationships" :
                                "Practical and measured approach to emotional matters"}
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-cosmic-light-purple/80">Head Line Depth:</span>
                              <span className="text-sm text-cosmic-gold">
                                {palmFeatures.headLineDepth ? `${Math.round(palmFeatures.headLineDepth * 10)}/10` : "N/A"}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-cosmic-dark rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cosmic-purple/70 rounded-full" 
                                style={{ width: `${(palmFeatures.headLineDepth || 0) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-cosmic-light-purple/60 mt-1">
                              {palmFeatures.headLineDepth && palmFeatures.headLineDepth > 0.7 ? 
                                "Deep analytical thinking and strong intellectual abilities" :
                                palmFeatures.headLineDepth && palmFeatures.headLineDepth > 0.4 ?
                                "Good balance of practical and creative thinking" :
                                "Intuitive and spontaneous thought processes"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {palmInsights && palmInsights.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-cosmic-light-purple mb-2">Palm Reading Insights:</h4>
                        <ul className="list-disc list-inside space-y-2 text-cosmic-light-purple/80">
                          {palmInsights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-xs text-cosmic-light-purple/60 mt-4 italic">
                      * Palm analysis results are based on advanced pattern recognition of palm lines and features
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-cosmic-light-purple/70">
                    Palm reading analysis is available when you scan your palm using the Palm Scanner.
                    <br />
                    Select "Enhanced Analysis Mode" for more detailed palm reading insights.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Daily Insights Tab */}
            <TabsContent value="daily" className="space-y-6">
              <div className="p-5 bg-cosmic-dark/40 rounded-lg border border-cosmic-purple/30">
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Daily Cosmic Alignment</h3>
                {dailyForecast ? (
                  <p className="text-cosmic-light-purple/90 mb-4">{dailyForecast}</p>
                ) : (
                  <p className="text-cosmic-light-purple/70">
                    Daily forecasts are available with enhanced destiny analysis. 
                    Please select "Use Enhanced API Analysis" when scanning your birth date.
                  </p>
                )}
                
                {luckyDates && luckyDates.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-cosmic-light-purple mb-2">Lucky Dates This Month:</h4>
                    <div className="flex flex-wrap gap-2">
                      {luckyDates.map((date, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="text-cosmic-light-purple mb-3">Cosmic Affirmation for Today</h4>
                  <div className="bg-cosmic-dark/30 p-3 rounded-lg border border-cosmic-purple/20 italic text-cosmic-light-purple/90">
                    {destinyNumber === 1 && "I am a powerful creator, manifesting my unique path with confidence and courage."}
                    {destinyNumber === 2 && "I bring harmony and cooperation to all my relationships, creating peace wherever I go."}
                    {destinyNumber === 3 && "I express my creativity freely, bringing joy and inspiration to myself and others."}
                    {destinyNumber === 4 && "I build solid foundations for my future, creating stability and security in all areas of life."}
                    {destinyNumber === 5 && "I embrace change as my ally, finding freedom and adventure in life's journey."}
                    {destinyNumber === 6 && "I balance giving and receiving, nurturing myself as I care for others."}
                    {destinyNumber === 7 && "I trust my inner wisdom, finding answers in both analysis and intuition."}
                    {destinyNumber === 8 && "I manifest abundance with integrity, using my power to create positive change."}
                    {destinyNumber === 9 && "I serve with compassion and wisdom, completing cycles to make way for new beginnings."}
                    {destinyNumber === 11 && "I channel higher wisdom into practical inspiration, illuminating paths for myself and others."}
                    {destinyNumber === 22 && "I transform dreams into reality through practical vision and masterful building."}
                    {destinyNumber === 33 && "I teach through compassionate example, bringing healing and enlightenment to all I touch."}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-cosmic-light-purple mb-3">Success Mantra Based on Your Destiny</h4>
                  <div className="bg-cosmic-dark/30 p-3 rounded-lg border border-cosmic-purple/20 text-cosmic-light-purple/90">
                    <p className="font-medium mb-1">
                      {destinyNumber === 1 && "Lead with courage, innovate with vision."}
                      {destinyNumber === 2 && "Harmonize with patience, nurture with intuition."}
                      {destinyNumber === 3 && "Express with joy, create with passion."}
                      {destinyNumber === 4 && "Build with diligence, organize with purpose."}
                      {destinyNumber === 5 && "Adapt with grace, experience with curiosity."}
                      {destinyNumber === 6 && "Nurture with boundaries, serve with balance."}
                      {destinyNumber === 7 && "Analyze with depth, trust your inner knowing."}
                      {destinyNumber === 8 && "Manifest with ethics, lead with responsibility."}
                      {destinyNumber === 9 && "Complete with gratitude, serve with compassion."}
                      {destinyNumber === 11 && "Inspire with insight, channel with clarity."}
                      {destinyNumber === 22 && "Build with vision, transform with mastery."}
                      {destinyNumber === 33 && "Teach with love, elevate with selflessness."}
                    </p>
                    <p className="text-sm">
                      Repeat this mantra during meditation, when facing challenges, or upon waking to align with your cosmic purpose.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-cosmic-light-purple/60 text-xs">
                <p>
                  Daily insights are refreshed each day and are influenced by your destiny number and current cosmic alignments.
                  <br />
                  For more personalized daily guidance, use the enhanced API analysis option.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinyResult;
