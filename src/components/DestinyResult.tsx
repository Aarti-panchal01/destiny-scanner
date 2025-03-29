
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Heart, Brain, Hand, Zap, Target, Scroll, Calendar, Book, Sparkle, BookOpen, Leaf, Compass, Gem } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDestinyMeaning, getDestinyTraits } from "@/utils/destinyCalculator";
import { NumerologyProfile } from "@/utils/numerologyCalculator";

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
  pastLifeInfluences?: string[];
  karmicLessons?: string[];
  personalYear?: {
    number: number;
    meaning: string;
    focus: string[];
  };
  personalMonth?: {
    number: number;
    meaning: string;
    opportunities: string[];
  };
  nameAnalysis?: {
    vibration: number;
    qualities: string[];
    influence: string;
  };
  spiritualPath?: {
    number: number;
    purpose: string;
    practices: string[];
  };
}

const DestinyResult: React.FC<DestinyResultProps> = ({
  destinyNumber,
  isVisible,
  palmFeatures,
  additionalInsights,
  compatibleNumbers,
  numerologyProfile,
  specialTraits,
  palmInsights,
  dailyForecast,
  luckyDates,
  pastLifeInfluences,
  karmicLessons,
  personalYear,
  personalMonth,
  nameAnalysis,
  spiritualPath
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cosmic-card p-6 md:p-8 mb-10"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className="bg-cosmic-purple/30 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-cosmic-gold">{destinyNumber}</span>
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-cosmic-gold" />
            </motion.div>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-cosmic-light-purple mb-2">
          Your Destiny Number
        </h2>
        <p className="text-cosmic-light-purple/70 max-w-2xl mx-auto">
          This sacred number reveals your life purpose and spiritual path. It is calculated from your birth date and represents the energies that guide your soul's journey.
        </p>
      </div>

      {/* Summary Card */}
      {numerologyProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-cosmic-dark/50 border border-cosmic-purple/30 p-4 rounded-lg mb-8"
        >
          <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
            <Stars className="mr-2 h-5 w-5" /> Cosmic Blueprint Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Mulank (Root Number):</strong> {numerologyProfile.mulank.number}
              </p>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Bhagyank (Destiny Number):</strong> {numerologyProfile.bhagyank.number}
              </p>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Power Number:</strong> {numerologyProfile.powerNumber.number}
              </p>
              <p className="text-cosmic-light-purple/80">
                <strong className="text-cosmic-light-purple">Ruling Planet:</strong> {numerologyProfile.rulingPlanet.name}
              </p>
            </div>
            <div>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Element:</strong> {numerologyProfile.elementInfluence?.primaryElement || "Unknown"}
              </p>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Lucky Colors:</strong> {numerologyProfile.luckyColors.slice(0, 2).join(", ")}
              </p>
              <p className="text-cosmic-light-purple/80 mb-1">
                <strong className="text-cosmic-light-purple">Lucky Gemstones:</strong> {numerologyProfile.luckyGemstones.slice(0, 2).join(", ")}
              </p>
              <p className="text-cosmic-light-purple/80">
                <strong className="text-cosmic-light-purple">Compatible Numbers:</strong> {numerologyProfile.compatibleNumbers.join(", ")}
              </p>
            </div>
          </div>
          
          {dailyForecast && (
            <div className="mt-4 bg-cosmic-purple/10 p-3 rounded">
              <p className="text-cosmic-light-purple font-medium">Today's Forecast:</p>
              <p className="text-cosmic-light-purple/80 text-sm italic">{dailyForecast}</p>
            </div>
          )}
        </motion.div>
      )}

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 bg-cosmic-dark/40 border border-cosmic-purple/20">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
          >
            <Stars className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="numerology" 
            className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
          >
            <Zap className="mr-2 h-4 w-4" />
            Numerology
          </TabsTrigger>
          <TabsTrigger 
            value="personality" 
            className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
          >
            <Brain className="mr-2 h-4 w-4" />
            Personality
          </TabsTrigger>
          <TabsTrigger 
            value="spiritual" 
            className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
          >
            <Sparkle className="mr-2 h-4 w-4" />
            Spiritual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div>
            <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Your Destiny Meaning</h3>
            <p className="text-cosmic-light-purple/90 leading-relaxed">
              {getDestinyMeaning(destinyNumber)}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Key Traits</h3>
            <div className="flex flex-wrap gap-2">
              {getDestinyTraits(destinyNumber).map((trait, index) => (
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
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Compatible Numbers</h3>
              <div className="flex flex-wrap gap-2">
                {compatibleNumbers.map((num, index) => (
                  <span
                    key={index}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-cosmic-purple/40 text-cosmic-light-purple"
                  >
                    {num}
                  </span>
                ))}
              </div>
              <p className="text-cosmic-light-purple/70 text-sm mt-2">
                These numbers resonate harmoniously with your energy. People, dates, and addresses with these numbers will often bring positive experiences into your life.
              </p>
            </motion.div>
          )}
          
          {/* Current Cosmic Influences */}
          {(personalYear || personalMonth) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Current Cosmic Influences
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalYear && (
                  <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                    <h4 className="text-cosmic-light-purple font-medium mb-2">Personal Year: {personalYear.number}</h4>
                    <p className="text-cosmic-light-purple/80 text-sm mb-3">{personalYear.meaning}</p>
                    <div>
                      <p className="text-cosmic-light-purple/90 text-sm font-medium mb-1">Focus Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {personalYear.focus.map((focus: string, i: number) => (
                          <span key={i} className="text-xs bg-cosmic-purple/20 px-2 py-1 rounded-full">
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {personalMonth && (
                  <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                    <h4 className="text-cosmic-light-purple font-medium mb-2">Personal Month: {personalMonth.number}</h4>
                    <p className="text-cosmic-light-purple/80 text-sm mb-3">{personalMonth.meaning}</p>
                    <div>
                      <p className="text-cosmic-light-purple/90 text-sm font-medium mb-1">Opportunities:</p>
                      <div className="flex flex-wrap gap-1">
                        {personalMonth.opportunities.map((opportunity: string, i: number) => (
                          <span key={i} className="text-xs bg-cosmic-purple/20 px-2 py-1 rounded-full">
                            {opportunity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Lucky Dates if available */}
          {luckyDates && luckyDates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Lucky Dates This Month</h3>
              <div className="flex flex-wrap gap-2">
                {luckyDates.map((date, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-cosmic-gold/30 text-cosmic-light-purple"
                  >
                    {date}
                  </span>
                ))}
              </div>
              <p className="text-cosmic-light-purple/70 text-sm mt-2">
                These dates align with your numerological and astrological patterns, creating opportunities for success and positive outcomes.
              </p>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="numerology" className="space-y-6">
          {numerologyProfile && (
            <>
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                  <Zap className="mr-2 h-5 w-5" /> Mulank (Root Number): {numerologyProfile.mulank.number}
                </h3>
                <p className="text-cosmic-light-purple/90 mb-3">
                  {numerologyProfile.mulank.meaning}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {numerologyProfile.mulank.traits.map((trait, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                  <Target className="mr-2 h-5 w-5" /> Bhagyank (Destiny Number): {numerologyProfile.bhagyank.number}
                </h3>
                <p className="text-cosmic-light-purple/90 mb-3">
                  {numerologyProfile.bhagyank.meaning}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {numerologyProfile.bhagyank.traits.map((trait, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" /> Power Number: {numerologyProfile.powerNumber.number}
                </h3>
                <p className="text-cosmic-light-purple/90">
                  {numerologyProfile.powerNumber.meaning}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Ruling Planet: {numerologyProfile.rulingPlanet.name}</h3>
                <p className="text-cosmic-light-purple/90">
                  {numerologyProfile.rulingPlanet.influence}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Compatible Numbers</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {numerologyProfile.compatibleNumbers.map((num, index) => (
                      <span
                        key={index}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-cosmic-purple/40 text-cosmic-light-purple"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <p className="text-cosmic-light-purple/70 text-sm">
                    These numbers enhance your energy and bring harmony.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Challenging Numbers</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {numerologyProfile.incompatibleNumbers.map((num, index) => (
                      <span
                        key={index}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-cosmic-purple/20 text-cosmic-light-purple/70"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <p className="text-cosmic-light-purple/70 text-sm">
                    These numbers may create friction or challenges.
                  </p>
                </div>
              </div>
              
              {/* Name Analysis if available */}
              {nameAnalysis && (
                <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                    <Book className="mr-2 h-5 w-5" /> Name Vibration: {nameAnalysis.vibration}
                  </h3>
                  <p className="text-cosmic-light-purple/90 mb-3">
                    {nameAnalysis.influence}
                  </p>
                  <div>
                    <h4 className="text-cosmic-light-purple font-medium mb-2">Name Qualities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {nameAnalysis.qualities.map((quality: string, index: number) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-cosmic-gold mb-2 font-medium">Lucky Colors</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {numerologyProfile.luckyColors.map((color, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-cosmic-gold mb-2 font-medium">Lucky Gemstones</h3>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {numerologyProfile.luckyGemstones.map((stone, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                        {stone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="personality" className="space-y-6">
          {numerologyProfile && (
            <>
              <div>
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Personality Overview</h3>
                <p className="text-cosmic-light-purple/90 leading-relaxed">
                  {numerologyProfile.personalityOverview}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium flex items-center">
                    <Heart className="mr-2 h-5 w-5" /> Relationship Traits
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {numerologyProfile.relationshipTraits.map((trait, index) => (
                      <li key={index} className="text-sm">
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium flex items-center">
                    <Gem className="mr-2 h-5 w-5" /> Financial Traits
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {numerologyProfile.financialTraits.map((trait, index) => (
                      <li key={index} className="text-sm">
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium">Health Traits</h3>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {numerologyProfile.healthTraits.map((trait, index) => (
                      <li key={index} className="text-sm">
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium">Career Paths</h3>
                  <div className="flex flex-wrap gap-2">
                    {numerologyProfile.careerPaths.map((career, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium">Life Challenges</h3>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {numerologyProfile.lifeChallenges.map((challenge, index) => (
                      <li key={index} className="text-sm">
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-cosmic-gold mb-3 font-medium">Life Lessons</h3>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {numerologyProfile.lifeLessons.map((lesson, index) => (
                      <li key={index} className="text-sm">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Display palm readings if available */}
              {palmFeatures && (
                <div className="mt-4">
                  <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                    <Hand className="mr-2 h-5 w-5" /> Palm Reading Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-cosmic-light-purple font-medium mb-2">Major Lines:</h4>
                      <ul className="space-y-2 text-cosmic-light-purple/90">
                        {palmFeatures.lifeLineLength && (
                          <li className="text-sm">
                            <strong>Life Line:</strong> {palmFeatures.lifeLineLength > 0.7 
                              ? "Long, indicating vitality and resilience" 
                              : "Moderate, showing practical energy management"}
                          </li>
                        )}
                        {palmFeatures.heartLineStrength && (
                          <li className="text-sm">
                            <strong>Heart Line:</strong> {palmFeatures.heartLineStrength > 0.6 
                              ? "Strong, showing deep emotional capacity" 
                              : "Balanced, indicating emotional stability"}
                          </li>
                        )}
                        {palmFeatures.headLineDepth && (
                          <li className="text-sm">
                            <strong>Head Line:</strong> {palmFeatures.headLineDepth > 0.6 
                              ? "Deep, showing analytical thinking" 
                              : "Flowing, indicating creative thoughts"}
                          </li>
                        )}
                        {palmFeatures.fateLinePresence !== undefined && (
                          <li className="text-sm">
                            <strong>Fate Line:</strong> {palmFeatures.fateLinePresence 
                              ? "Prominent, showing a strong sense of destiny" 
                              : "Subtle, indicating flexibility in life path"}
                          </li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-cosmic-light-purple font-medium mb-2">Special Features:</h4>
                      <ul className="space-y-2 text-cosmic-light-purple/90">
                        {palmFeatures.dominantMount && (
                          <li className="text-sm">
                            <strong>Dominant Mount:</strong> Mount of {palmFeatures.dominantMount}, 
                            indicating {palmFeatures.dominantMount === 'Venus' 
                              ? 'strong creative and romantic energy' 
                              : palmFeatures.dominantMount === 'Jupiter' 
                                ? 'leadership qualities and ambition' 
                                : palmFeatures.dominantMount === 'Saturn' 
                                  ? 'wisdom and responsibility' 
                                  : palmFeatures.dominantMount === 'Apollo' 
                                    ? 'creative talent and recognition' 
                                    : 'intellectual abilities and communication skills'}
                          </li>
                        )}
                        {palmFeatures.specialMarks && palmFeatures.specialMarks.length > 0 && 
                          palmFeatures.specialMarks.map((mark, index) => (
                            <li key={index} className="text-sm">
                              <strong>{mark.type}:</strong> {mark.meaning} (found in {mark.location})
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                  
                  {/* Display palm insights if available */}
                  {palmInsights && palmInsights.length > 0 && (
                    <div className="mt-4 bg-cosmic-purple/10 p-3 rounded">
                      <h4 className="text-cosmic-light-purple font-medium mb-2">Palm Reader's Insights:</h4>
                      <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                        {palmInsights.map((insight, index) => (
                          <li key={index} className="text-sm">
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="spiritual" className="space-y-6">
          {/* Past Life Influences */}
          {pastLifeInfluences && pastLifeInfluences.length > 0 && (
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Past Life Influences
              </h3>
              <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                <p className="text-cosmic-light-purple/90 mb-3">
                  Your soul carries wisdom from previous incarnations. These past lives continue to influence your current path and provide soul memories that may manifest as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-cosmic-light-purple/90">
                  {pastLifeInfluences.map((influence, index) => (
                    <li key={index} className="text-sm">
                      {influence}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Karmic Lessons */}
          {karmicLessons && karmicLessons.length > 0 && (
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                <Scroll className="mr-2 h-5 w-5" /> Karmic Lessons
              </h3>
              <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                <p className="text-cosmic-light-purple/90 mb-3">
                  These are the spiritual lessons your soul has chosen to master in this lifetime:
                </p>
                <ul className="list-disc list-inside space-y-2 text-cosmic-light-purple/90">
                  {karmicLessons.map((lesson, index) => (
                    <li key={index} className="text-sm">
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Spiritual Path */}
          {spiritualPath && (
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium flex items-center">
                <Compass className="mr-2 h-5 w-5" /> Spiritual Path: {spiritualPath.number}
              </h3>
              <div className="bg-cosmic-purple/10 p-4 rounded-lg">
                <p className="text-cosmic-light-purple/90 mb-3">
                  <strong>Soul Purpose:</strong> {spiritualPath.purpose}
                </p>
                <div>
                  <h4 className="text-cosmic-light-purple font-medium mb-2">Spiritual Practices That Support Your Path:</h4>
                  <ul className="list-disc list-inside space-y-1 text-cosmic-light-purple/90">
                    {spiritualPath.practices.map((practice: string, index: number) => (
                      <li key={index} className="text-sm">
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Special Traits */}
          {specialTraits && specialTraits.length > 0 && (
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Spiritual Gifts</h3>
              <div className="flex flex-wrap gap-2">
                {specialTraits.map((trait, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-cosmic-purple/20 text-cosmic-light-purple text-sm">
                    {trait}
                  </span>
                ))}
              </div>
              <p className="text-cosmic-light-purple/70 text-sm mt-2">
                These are your innate spiritual talents and abilities that you can develop and share with the world.
              </p>
            </div>
          )}
          
          {/* Daily Mantra */}
          {dailyForecast && (
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Daily Mantra</h3>
              <div className="bg-cosmic-purple/20 p-5 rounded-lg text-center italic">
                <p className="text-cosmic-light-purple">
                  "{dailyForecast.split('.')[0]}."
                </p>
              </div>
              <p className="text-cosmic-light-purple/70 text-sm mt-2 text-center">
                Repeat this mantra three times each morning to align with your cosmic energy.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default DestinyResult;
