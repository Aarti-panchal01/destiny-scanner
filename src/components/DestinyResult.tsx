
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDestinyMeaning, getDestinyTraits } from "@/utils/destinyCalculator";

interface PalmFeatures {
  lifeLineLength?: number;
  lifeLineClarity?: number;
  heartLineStrength?: number;
  headLineDepth?: number;
  fateLinePresence?: boolean;
  dominantMount?: string;
  fingerRatio?: number[];
}

interface DestinyResultProps {
  destinyNumber: number;
  isVisible: boolean;
  palmFeatures?: PalmFeatures | null;
  additionalInsights?: string[];
  compatibleNumbers?: number[];
}

const DestinyResult = ({ 
  destinyNumber, 
  isVisible,
  palmFeatures,
  additionalInsights,
  compatibleNumbers
}: DestinyResultProps) => {
  const meaning = getDestinyMeaning(destinyNumber);
  const traits = getDestinyTraits(destinyNumber);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="cosmic-card max-w-xl mx-auto p-6 md:p-8"
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
              Your Destiny Number
            </h2>
            <p className="text-cosmic-light-purple/70">
              This sacred number reveals your cosmic blueprint
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Destiny Meaning</h3>
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
                <h3 className="text-xl text-cosmic-gold mb-3 font-medium">Deeper Insights</h3>
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
            
            {/* Display palm reading results if available */}
            {palmFeatures && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="p-4 bg-cosmic-dark/40 rounded-lg border border-cosmic-purple/30"
              >
                <h3 className="text-lg text-cosmic-gold mb-3 font-medium">Palm Reading Analysis</h3>
                
                {palmFeatures.dominantMount && (
                  <div className="mb-3">
                    <span className="text-cosmic-light-purple font-medium">Dominant Mount:</span>{" "}
                    <span className="text-cosmic-light-purple/90">{palmFeatures.dominantMount}</span>
                    <p className="text-sm text-cosmic-light-purple/70 mt-1">
                      {palmFeatures.dominantMount === "Venus" && "Indicates creativity, love, and sensuality"}
                      {palmFeatures.dominantMount === "Jupiter" && "Shows leadership, ambition, and authority"}
                      {palmFeatures.dominantMount === "Saturn" && "Reveals wisdom, responsibility, and caution"}
                      {palmFeatures.dominantMount === "Apollo" && "Signifies artistic talent, recognition, and success"}
                      {palmFeatures.dominantMount === "Mercury" && "Indicates intelligence, communication skills, and quick thinking"}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  {palmFeatures.lifeLineLength !== undefined && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-cosmic-light-purple/80">Life Line:</span>
                        <div className="w-20 h-2 bg-cosmic-dark rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cosmic-gold/70 rounded-full" 
                            style={{ width: `${palmFeatures.lifeLineLength * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-cosmic-light-purple/80">Heart Line:</span>
                        <div className="w-20 h-2 bg-cosmic-dark rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cosmic-purple/70 rounded-full" 
                            style={{ width: `${(palmFeatures.heartLineStrength || 0) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {palmFeatures.headLineDepth !== undefined && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-cosmic-light-purple/80">Head Line:</span>
                        <div className="w-20 h-2 bg-cosmic-dark rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cosmic-light-purple/70 rounded-full" 
                            style={{ width: `${(palmFeatures.headLineDepth || 0) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-cosmic-light-purple/80">Fate Line:</span>
                        <div className="w-20 h-2 bg-cosmic-dark rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cosmic-gold/70 rounded-full" 
                            style={{ width: palmFeatures.fateLinePresence ? "100%" : "30%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-cosmic-light-purple/60 mt-3 italic">
                  * Palm analysis results are based on advanced pattern recognition of palm lines and features
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinyResult;
