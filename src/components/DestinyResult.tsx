
import React from "react";
import { getDestinyMeaning, getDestinyTraits } from "@/utils/destinyCalculator";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface DestinyResultProps {
  destinyNumber: number;
  isVisible: boolean;
}

const DestinyResult = ({ destinyNumber, isVisible }: DestinyResultProps) => {
  if (!isVisible) return null;

  const meaning = getDestinyMeaning(destinyNumber);
  const traits = getDestinyTraits(destinyNumber);
  
  const isMasterNumber = [11, 22, 33].includes(destinyNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="cosmic-card p-6 max-w-2xl mx-auto glow"
    >
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="text-cosmic-gold w-6 h-6 mr-2" />
        <h2 className="text-2xl font-bold text-white">
          Your Destiny Number is{" "}
          <span className={`text-3xl ${isMasterNumber ? "text-cosmic-gold" : "text-cosmic-purple"}`}>
            {destinyNumber}
          </span>
        </h2>
        <Sparkles className="text-cosmic-gold w-6 h-6 ml-2" />
      </div>

      {isMasterNumber && (
        <div className="mb-4 p-2 bg-cosmic-gold/10 rounded-md border border-cosmic-gold/20">
          <p className="text-cosmic-gold font-medium">
            You have a powerful Master Number! These rare numbers carry heightened spiritual energy and potential.
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-cosmic-light-purple">Your Destiny Path</h3>
        <p className="text-white/90 leading-relaxed">{meaning}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-cosmic-light-purple">Key Traits</h3>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                isMasterNumber 
                  ? "bg-cosmic-gold/20 text-cosmic-gold border border-cosmic-gold/30" 
                  : "bg-cosmic-purple/20 text-cosmic-light-purple border border-cosmic-purple/30"
              }`}
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DestinyResult;
