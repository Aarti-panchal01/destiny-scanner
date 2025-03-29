
import React, { useState } from "react";
import DateSelector from "@/components/DateSelector";
import PalmScanner from "@/components/PalmScanner";
import DestinyResult from "@/components/DestinyResult";
import { calculateDestinyNumber } from "@/utils/destinyCalculator";
import { getZodiacSign } from "@/utils/zodiacCalculator";
import { getEnhancedDestiny } from "@/utils/apiService";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scan, Stars, Calendar, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PalmFeatures {
  lifeLineLength?: number;
  lifeLineClarity?: number;
  heartLineStrength?: number;
  headLineDepth?: number;
  fateLinePresence?: boolean;
  dominantMount?: string;
  fingerRatio?: number[];
}

const Index = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [useEnhancedAPI, setUseEnhancedAPI] = useState(false);
  const [palmFeatures, setPalmFeatures] = useState<PalmFeatures | null>(null);
  const [additionalInsights, setAdditionalInsights] = useState<string[]>([]);
  const [compatibleNumbers, setCompatibleNumbers] = useState<number[]>([]);
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
        // Use enhanced API for more accurate and detailed destiny calculation
        const enhancedResult = await getEnhancedDestiny(birthDate);
        
        setDestinyNumber(enhancedResult.destinyNumber);
        setAdditionalInsights(enhancedResult.insights);
        setCompatibleNumbers(enhancedResult.compatibility);
        
        toast({
          title: "Enhanced Destiny Revealed!",
          description: `Your destiny number is ${enhancedResult.destinyNumber}`,
          variant: "default",
        });
      } catch (error) {
        console.error("Error with enhanced destiny API:", error);
        // Fallback to basic calculation
        const number = calculateDestinyNumber(birthDate);
        setDestinyNumber(number);
        
        toast({
          title: "Destiny Revealed!",
          description: `Your destiny number is ${number} (API fallback)`,
          variant: "default",
        });
      } finally {
        setIsApiLoading(false);
      }
    } else {
      // Use basic calculation without API
      const number = calculateDestinyNumber(birthDate);
      setDestinyNumber(number);
      
      toast({
        title: "Destiny Revealed!",
        description: `Your destiny number is ${number}`,
        variant: "default",
      });
    }
    
    setShowResult(true);
  };

  const handlePalmScanComplete = (number: number, features?: PalmFeatures) => {
    setDestinyNumber(number);
    if (features) {
      setPalmFeatures(features);
      
      // Generate generic insights based on palm features
      if (features.dominantMount) {
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
            Destiny Scanner
          </h1>
          <p className="text-lg md:text-xl text-cosmic-light-purple/80 max-w-2xl mx-auto">
            Discover your life path and cosmic destiny through ancient numerology. 
            Choose to enter your birth date or scan your palm to reveal what the universe has in store for you.
          </p>
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
              
              <div className="flex items-center space-x-2 mb-5 mt-4">
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
                <Info className="h-4 w-4 text-cosmic-light-purple/60 cursor-help" title="Enhanced analysis provides additional insights and compatibility information" />
              </div>
              
              {birthDate && (
                <div className="mb-5 p-4 bg-cosmic-dark/30 border border-cosmic-purple/20 rounded-lg">
                  <h3 className="text-lg text-cosmic-light-purple mb-2">Zodiac Information</h3>
                  {(() => {
                    const zodiacInfo = getZodiacSign(birthDate);
                    return (
                      <div className="text-sm text-cosmic-light-purple/80">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-cosmic-gold font-medium">{zodiacInfo.name}</p>
                            <p>{zodiacInfo.dateRange}</p>
                          </div>
                          <div>
                            <p>Element: <span className="text-cosmic-gold">{zodiacInfo.element}</span></p>
                            <p>Planet: {zodiacInfo.rulingPlanet}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-cosmic-light-purple font-medium mb-1">Key Traits:</p>
                          <div className="flex flex-wrap gap-1">
                            {zodiacInfo.traits.map((trait, index) => (
                              <span 
                                key={index}
                                className="bg-cosmic-purple/20 px-2 py-1 rounded-full text-xs"
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
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
          />
        )}

        <div className="mt-16 text-center text-cosmic-light-purple/60 text-sm">
          <p>
            Destiny Scanner uses ancient numerology principles to calculate your destiny number.
            <br />
            Enhanced API analysis provides deeper insights based on advanced algorithms.
            <br />
            Remember that you always have the power to shape your own path.
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
