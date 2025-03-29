
import React, { useState } from "react";
import DateSelector from "@/components/DateSelector";
import PalmScanner from "@/components/PalmScanner";
import DestinyResult from "@/components/DestinyResult";
import { calculateDestinyNumber } from "@/utils/destinyCalculator";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scan, Stars, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateDestiny = () => {
    if (!birthDate) {
      toast({
        title: "Date Required",
        description: "Please select your birth date first",
        variant: "destructive",
      });
      return;
    }

    // Calculate destiny number
    const number = calculateDestinyNumber(birthDate);
    setDestinyNumber(number);
    setShowResult(true);

    toast({
      title: "Destiny Revealed!",
      description: `Your destiny number is ${number}`,
      variant: "default",
    });
  };

  const handlePalmScanComplete = (number: number) => {
    setDestinyNumber(number);
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
              <Button 
                onClick={calculateDestiny}
                className="cosmic-button w-full flex items-center justify-center mt-6"
              >
                <Scan className="mr-2 h-5 w-5" />
                Reveal Your Destiny
              </Button>
            </TabsContent>
            
            <TabsContent value="palm">
              <PalmScanner onScanComplete={handlePalmScanComplete} />
            </TabsContent>
          </Tabs>
        </motion.div>

        {destinyNumber !== null && (
          <DestinyResult destinyNumber={destinyNumber} isVisible={showResult} />
        )}

        <div className="mt-16 text-center text-cosmic-light-purple/60 text-sm">
          <p>
            Destiny Scanner uses ancient numerology principles to calculate your destiny number.
            <br />
            Remember that you always have the power to shape your own path.
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
