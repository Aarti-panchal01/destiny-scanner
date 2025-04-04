
import React, { useState } from "react";
import DateSelector from "@/components/DateSelector";
import PalmScanner from "@/components/PalmScanner";
import DestinyResult from "@/components/DestinyResult";
import RotatingTagline from "@/components/RotatingTagline";
import { calculateDestinyNumber } from "@/utils/destinyCalculator";
import { getZodiacSign } from "@/utils/zodiacCalculator";
import { getEnhancedDestiny, analyzePalmImage, EnhancedDestinyResponse } from "@/utils/apiService";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scan, Stars, Calendar, Info, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAstrologicalDetails } from "@/utils/astrologicalCalculations";
import { calculateNumerologyProfile, NumerologyProfile, calculatePersonalYear, calculatePersonalMonth, analyzeNameNumerology, calculateSpiritualPath } from "@/utils/numerologyCalculator";

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

const Index = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [birthTime, setBirthTime] = useState<string>("");
  const [birthLocation, setBirthLocation] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [useEnhancedAPI, setUseEnhancedAPI] = useState(false);
  const [palmFeatures, setPalmFeatures] = useState<PalmFeatures | null>(null);
  const [additionalInsights, setAdditionalInsights] = useState<string[]>([]);
  const [compatibleNumbers, setCompatibleNumbers] = useState<number[]>([]);
  const [numerologyProfile, setNumerologyProfile] = useState<NumerologyProfile | undefined>(undefined);
  const [specialTraits, setSpecialTraits] = useState<string[] | undefined>(undefined);
  const [palmInsights, setPalmInsights] = useState<string[] | undefined>(undefined);
  const [dailyForecast, setDailyForecast] = useState<string | undefined>(undefined);
  const [luckyDates, setLuckyDates] = useState<string[] | undefined>(undefined);
  const [pastLifeInfluences, setPastLifeInfluences] = useState<string[] | undefined>(undefined);
  const [karmicLessons, setKarmicLessons] = useState<string[] | undefined>(undefined);
  const [personalYear, setPersonalYear] = useState<any | undefined>(undefined);
  const [personalMonth, setPersonalMonth] = useState<any | undefined>(undefined);
  const [nameAnalysis, setNameAnalysis] = useState<any | undefined>(undefined);
  const [spiritualPath, setSpiritualPath] = useState<any | undefined>(undefined);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const calculateDestiny = async () => {
    if (!birthDate) {
      toast({
        title: "Date Required",
        description: "Please select your birth date first",
        variant: "destructive",
      });
      return;
    }

    if (useEnhancedAPI) {
      setIsApiLoading(true);
      try {
        const enhancedResult: EnhancedDestinyResponse = await getEnhancedDestiny(birthDate, birthTime || undefined, birthLocation || undefined);
        
        setDestinyNumber(enhancedResult.destinyNumber);
        setAdditionalInsights(enhancedResult.insights);
        setCompatibleNumbers(enhancedResult.compatibility);
        setNumerologyProfile(enhancedResult.numerologyProfile);
        setSpecialTraits(enhancedResult.specialTraits);
        setDailyForecast(enhancedResult.dailyForecast);
        setLuckyDates(enhancedResult.luckyDates);
        setPastLifeInfluences(enhancedResult.pastLifeInfluences);
        setKarmicLessons(enhancedResult.karmicLessons);
        
        toast({
          title: "Enhanced Destiny Revealed!",
          description: `Your destiny number is ${enhancedResult.destinyNumber}`,
          variant: "default",
        });
      } catch (error) {
        console.error("Error with enhanced destiny API:", error);
        const number = calculateDestinyNumber(birthDate);
        setDestinyNumber(number);
        
        const numerologyData = calculateNumerologyProfile(birthDate);
        setNumerologyProfile(numerologyData);
        
        const astroDetails = calculateAstrologicalDetails(birthDate, birthTime, birthLocation);
        setPastLifeInfluences(astroDetails.pastLifeInfluences);
        setKarmicLessons(astroDetails.karmicLessons);
        
        setPersonalYear(calculatePersonalYear(birthDate));
        setPersonalMonth(calculatePersonalMonth(birthDate));
        
        if (name && name.trim() !== '') {
          setNameAnalysis(analyzeNameNumerology(name));
        }
        
        setSpiritualPath(calculateSpiritualPath(birthDate));
        
        toast({
          title: "Destiny Revealed!",
          description: `Your destiny number is ${number} (API fallback)`,
          variant: "default",
        });
      } finally {
        setIsApiLoading(false);
      }
    } else {
      const number = calculateDestinyNumber(birthDate);
      setDestinyNumber(number);
      
      const numerologyData = calculateNumerologyProfile(birthDate);
      setNumerologyProfile(numerologyData);
      
      const astroDetails = calculateAstrologicalDetails(birthDate, birthTime, birthLocation);
      setPastLifeInfluences(astroDetails.pastLifeInfluences);
      setKarmicLessons(astroDetails.karmicLessons);
      
      setPersonalYear(calculatePersonalYear(birthDate));
      setPersonalMonth(calculatePersonalMonth(birthDate));
      
      if (name && name.trim() !== '') {
        setNameAnalysis(analyzeNameNumerology(name));
      }
      
      setSpiritualPath(calculateSpiritualPath(birthDate));
      
      setSpecialTraits(undefined);
      setDailyForecast(undefined);
      setLuckyDates(undefined);
      
      toast({
        title: "Destiny Revealed!",
        description: `Your destiny number is ${number}`,
        variant: "default",
      });
    }
    
    setShowResult(true);
  };

  const handlePalmScanComplete = (number: number, features?: PalmFeatures, insights?: string[]) => {
    setDestinyNumber(number);
    if (features) {
      setPalmFeatures(features);
      setPalmInsights(insights);
      
      if (!insights && features.dominantMount) {
        const mountInsights: Record<string, string> = {
          'Venus': 'You have strong creative and romantic tendencies',
          'Jupiter': 'Leadership and ambition are prominent in your path',
          'Saturn': 'You have deep wisdom and responsibility in your nature',
          'Apollo': 'Creative expression and recognition are important to you',
          'Mercury': 'You have strong communication skills and adaptability'
        };
        
        setAdditionalInsights([
          mountInsights[features.dominantMount] || 'Your palm shows unique qualities',
          features.fateLinePresence 
            ? 'Your fate line indicates a strong sense of purpose in life' 
            : 'Your path in life may be more flexible and self-directed',
          `Your ${features.heartLineStrength && features.heartLineStrength > 0.6 ? 'strong' : 'moderate'} heart line reveals your emotional nature`
        ]);
      }
    }
    setShowResult(true);
  };

  return (
    <>
      <div className="stars-bg" />
      <div className="min-h-screen container py-12 px-4 max-w-4xl">
        {/* ACE INFINITY Brand Promotion Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 py-2 px-4 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-5 w-5 text-cosmic-gold animate-pulse" />
            <p className="text-sm md:text-base font-medium bg-gradient-to-r from-cosmic-gold to-cosmic-light-purple bg-clip-text text-transparent">
              PREMIUM COSMIC INSIGHTS POWERED BY <span className="font-bold">ACE INFINITY</span>
            </p>
            <Sparkles className="h-5 w-5 text-cosmic-gold animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-2">
            <Stars className="h-10 w-10 text-cosmic-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cosmic-light-purple to-cosmic-gold bg-clip-text text-transparent mb-4">
            ASTROBAE
          </h1>
          <RotatingTagline />
          <p className="text-lg md:text-xl text-cosmic-light-purple/80 max-w-2xl mx-auto mt-4">
            Discover your life path and cosmic destiny through ancient numerology and astrology. 
            Enter your birth details or scan your palm to reveal what the universe has in store for you.
          </p>
          
          {/* ACE INFINITY Secondary Brand Mention */}
          <div className="mt-3 flex justify-center">
            <div className="inline-flex items-center py-1 px-3 bg-cosmic-dark/40 border border-cosmic-purple/20 rounded-full">
              <span className="text-xs text-cosmic-light-purple/70">Advanced cosmic algorithms by </span>
              <span className="ml-1 text-xs font-bold text-cosmic-gold">ACE INFINITY</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="cosmic-card p-6 md:p-8 mb-10 max-w-xl mx-auto"
        >
          <Tabs defaultValue="date" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-6 bg-cosmic-dark/40 border border-cosmic-purple/20">
              <TabsTrigger 
                value="date"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Birth Date
              </TabsTrigger>
              <TabsTrigger 
                value="palm"
                className="data-[state=active]:bg-cosmic-purple/20 data-[state=active]:text-cosmic-light-purple"
              >
                <Scan className="mr-2 h-4 w-4" />
                Palm Scan
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="date">
              <DateSelector date={birthDate} setDate={setBirthDate} />
              
              <div className="space-y-4 mb-5 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="birth-time" className="block text-sm text-cosmic-light-purple mb-1">
                        Birth Time (Optional)
                      </label>
                      <input
                        type="time"
                        id="birth-time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full bg-cosmic-dark/30 border border-cosmic-purple/30 rounded-md p-2 text-cosmic-light-purple focus:outline-none focus:ring-1 focus:ring-cosmic-purple"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="birth-location" className="block text-sm text-cosmic-light-purple mb-1">
                        Birth Location (Optional)
                      </label>
                      <input
                        type="text"
                        id="birth-location"
                        value={birthLocation}
                        onChange={(e) => setBirthLocation(e.target.value)}
                        placeholder="City, Country"
                        className="w-full bg-cosmic-dark/30 border border-cosmic-purple/30 rounded-md p-2 text-cosmic-light-purple focus:outline-none focus:ring-1 focus:ring-cosmic-purple"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="name-analysis" className="block text-sm text-cosmic-light-purple mb-1">
                      Your Full Name (For Name Analysis)
                    </label>
                    <input
                      type="text"
                      id="name-analysis"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-cosmic-dark/30 border border-cosmic-purple/30 rounded-md p-2 text-cosmic-light-purple focus:outline-none focus:ring-1 focus:ring-cosmic-purple"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="api-enhanced"
                      checked={useEnhancedAPI}
                      onChange={(e) => setUseEnhancedAPI(e.target.checked)}
                      className="rounded-sm bg-cosmic-dark border-cosmic-purple/60 focus:ring-cosmic-purple"
                    />
                    <label htmlFor="api-enhanced" className="text-sm text-cosmic-light-purple cursor-pointer">
                      Use Enhanced API Analysis
                    </label>
                  </div>
                  <Info className="h-4 w-4 text-cosmic-light-purple/60 cursor-help" aria-label="Enhanced analysis provides additional insights and compatibility information" />
                </div>
              </div>
              
              {birthDate && (
                <div className="mb-5 p-4 bg-cosmic-dark/30 border border-cosmic-purple/20 rounded-lg">
                  <h3 className="text-lg text-cosmic-light-purple mb-2">Zodiac Information</h3>
                  {(() => {
                    const zodiacInfo = getZodiacSign(birthDate);
                    const astroDetails = calculateAstrologicalDetails(birthDate);
                    
                    return (
                      <div className="text-sm text-cosmic-light-purple/80">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="flex items-center">
                              <span className="text-cosmic-gold font-medium mr-1">{zodiacInfo.name}</span>
                              <span className="text-lg">{astroDetails.sunSign.symbol}</span>
                            </p>
                            <p>{zodiacInfo.dateRange}</p>
                          </div>
                          <div>
                            <p>Element: <span className="text-cosmic-gold">{zodiacInfo.element}</span></p>
                            <p>Quality: <span className="text-cosmic-light-purple">{astroDetails.sunSign.quality}</span></p>
                            <p>Planet: <span className="text-cosmic-gold">{zodiacInfo.rulingPlanet}</span></p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-cosmic-light-purple font-medium mb-1">Key Traits:</p>
                          <div className="flex flex-wrap gap-1">
                            {astroDetails.sunSign.strengths.slice(0, 5).map((trait, index) => (
                              <span 
                                key={index}
                                className="bg-cosmic-purple/20 px-2 py-1 rounded-full text-xs"
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-cosmic-light-purple font-medium mb-1">Life Challenge:</p>
                            <p className="text-xs">{zodiacInfo.challenges}</p>
                          </div>
                          <div>
                            <p className="text-cosmic-light-purple font-medium mb-1">Life Path Focus:</p>
                            <p className="text-xs">{zodiacInfo.lifePathFocus}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-cosmic-light-purple font-medium mb-1">Lucky Elements:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs">Colors: <span className="text-cosmic-gold">{astroDetails.sunSign.luckyColors.join(", ")}</span></p>
                            </div>
                            <div>
                              <p className="text-xs">Gemstones: <span className="text-cosmic-gold">{astroDetails.sunSign.luckyGemstones.join(", ")}</span></p>
                            </div>
                          </div>
                        </div>
                        
                        {astroDetails.dailyMantra && (
                          <div className="mt-3 bg-cosmic-purple/10 p-2 rounded-md">
                            <p className="text-cosmic-light-purple font-medium mb-1">Daily Mantra:</p>
                            <p className="text-xs italic">"{astroDetails.dailyMantra}"</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
              
              <Button 
                onClick={calculateDestiny}
                disabled={isApiLoading}
                className="cosmic-button w-full flex items-center justify-center mt-3"
              >
                {isApiLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Scan className="h-5 w-5" />
                    </motion.div>
                    Analyzing Cosmic Data...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-5 w-5" />
                    Reveal Your Destiny
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="palm">
              <PalmScanner onScanComplete={handlePalmScanComplete} />
            </TabsContent>
          </Tabs>
        </motion.div>

        {destinyNumber !== null && (
          <DestinyResult 
            destinyNumber={destinyNumber} 
            isVisible={showResult} 
            palmFeatures={palmFeatures}
            additionalInsights={additionalInsights}
            compatibleNumbers={compatibleNumbers}
            numerologyProfile={numerologyProfile}
            specialTraits={specialTraits}
            palmInsights={palmInsights}
            dailyForecast={dailyForecast}
            luckyDates={luckyDates}
            pastLifeInfluences={pastLifeInfluences}
            karmicLessons={karmicLessons}
            personalYear={personalYear}
            personalMonth={personalMonth}
            nameAnalysis={nameAnalysis}
            spiritualPath={spiritualPath}
          />
        )}

        <div className="mt-16 text-center text-cosmic-light-purple/60 text-sm">
          <p>
            Destiny Scanner uses ancient numerology principles and modern astrological insights to reveal your cosmic blueprint.
            <br />
            Enhanced API analysis provides deeper insights based on advanced algorithms and traditional wisdom.
            <br />
            Remember that you always have the power to shape your own path through conscious choices and actions.
          </p>
        </div>
        
        <div className="mt-8 text-center text-xs text-cosmic-light-purple/40">
          🌟 Powered by <span className="font-bold text-cosmic-light-purple/60">ACE INFINITY</span> 🌟
        </div>
      </div>
    </>
  );
};

export default Index;
