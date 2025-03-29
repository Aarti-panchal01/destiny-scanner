
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const taglines = [
  "Is it astrology, or are you just the problem?",
  "Your love life is a circus, and the stars are watching.",
  "We don't judge… but the moon does.",
  "Still blaming your sign for texting your ex?",
  "Your chart is waving more red than Mars.",
  "Manifesting? More like coping.",
  "Because your star sign is definitely not helping.",
  "The stars have spoken… and so has your crush (not).",
  "Your destiny is buffering… please wait.",
  "Your sign? Fire. Your choices? Worse.",
  "Reading your chart like it's a bad Yelp review.",
  "Manifesting a soulmate who doesn't even know you exist.",
  "Love is in the stars… but not for you.",
  "It's not you, it's definitely the universe.",
  "Your soulmate just blocked you. Again.",
  "\"Yeah, I'd totally date a Gemini\" – famous last words.",
  "Still waiting for them to orbit back…",
  "Your love life is a joke, and the stars are laughing.",
  "Astrology can't fix your bad decisions."
];

const RotatingTagline = () => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 15000); // Change tagline every 15 seconds (15000ms)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="h-8">
      <motion.p
        key={currentTaglineIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-cosmic-light-purple/80 text-lg italic font-medium px-3 py-1 rounded-full bg-cosmic-purple/10 shadow-inner shadow-cosmic-purple/20 border border-cosmic-purple/20 backdrop-blur-sm"
      >
        {taglines[currentTaglineIndex]}
      </motion.p>
    </div>
  );
};

export default RotatingTagline;
