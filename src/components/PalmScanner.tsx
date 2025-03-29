
import React, { useState, useRef, useEffect } from "react";
import { Scan, Camera, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface PalmScannerProps {
  onScanComplete: (destinyNumber: number) => void;
}

const PalmScanner = ({ onScanComplete }: PalmScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    }
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const capturePalmImage = () => {
    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please confirm your consent to analyze your palm",
        variant: "destructive",
      });
      return;
    }

    if (!isCameraActive) {
      toast({
        title: "Camera Inactive",
        description: "Please start your camera first",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);

    // Draw current video frame to canvas
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(
          videoRef.current, 
          0, 0, 
          videoRef.current.videoWidth, 
          videoRef.current.videoHeight
        );

        // In a real app, we would send this image to a palm reading API
        // For now, we'll simulate with a randomized but consistent result
        
        // Simulate analyzing for 3 seconds
        setTimeout(() => {
          // Get some data from the canvas to generate a stable "random" number
          const imageData = ctx.getImageData(
            0, 0, 
            Math.min(100, canvasRef.current!.width), 
            Math.min(100, canvasRef.current!.height)
          );
          
          let hash = 0;
          // Use the first 1000 pixels to generate a hash
          for (let i = 0; i < Math.min(imageData.data.length, 1000); i++) {
            hash = ((hash << 5) - hash) + imageData.data[i];
            hash |= 0; // Convert to 32bit integer
          }
          
          // Generate a number between 1 and 9, or master numbers 11, 22, 33
          let destinyNumber = Math.abs(hash) % 100;
          if (destinyNumber > 33) {
            destinyNumber = destinyNumber % 9 + 1;
          } else if (destinyNumber > 9 && destinyNumber !== 11 && destinyNumber !== 22 && destinyNumber !== 33) {
            destinyNumber = destinyNumber % 9 + 1;
          }
          
          setIsScanning(false);
          
          toast({
            title: "Palm Scan Complete",
            description: "Your palm has been analyzed successfully!",
            variant: "default",
          });
          
          onScanComplete(destinyNumber);
        }, 3000);
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-cosmic-light-purple text-xl mb-2 font-medium">
        Scan Your Palm in Real-Time
      </label>
      
      <div className="mb-4">
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center transition-all",
            isCameraActive 
              ? "border-cosmic-purple/70 bg-cosmic-dark/40" 
              : "border-cosmic-purple/30 bg-cosmic-dark/20"
          )}
        >
          <div className="relative mb-2">
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                "mx-auto max-h-60 rounded-lg w-full bg-black/20",
                !isCameraActive && "hidden"
              )}
            />
            
            {!isCameraActive && (
              <div className="flex flex-col items-center justify-center h-40">
                <Camera className="h-10 w-10 text-cosmic-purple mb-2" />
                <span className="text-cosmic-light-purple">Click the button below to activate your camera</span>
                <span className="text-cosmic-light-purple/60 text-sm mt-1">
                  Position your palm clearly in the frame for best results
                </span>
              </div>
            )}
            
            {/* Target overlay when camera is active */}
            {isCameraActive && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-40 h-40 border-2 border-cosmic-gold/70 rounded-full flex items-center justify-center">
                  <div className="w-36 h-36 border border-cosmic-gold/40 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 border border-cosmic-gold/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              className="bg-cosmic-dark/60 border-cosmic-purple/30 hover:bg-cosmic-dark/80 hover:border-cosmic-purple/50"
              onClick={toggleCamera}
            >
              {isCameraActive ? (
                <>
                  <Pause className="mr-1 h-4 w-4" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Play className="mr-1 h-4 w-4" />
                  Start Camera
                </>
              )}
            </Button>
            
            {isCameraActive && (
              <Button 
                variant="outline" 
                className="bg-cosmic-purple/20 border-cosmic-purple/50 hover:bg-cosmic-purple/30 text-cosmic-light-purple"
                onClick={capturePalmImage}
                disabled={isScanning}
              >
                <Camera className="mr-1 h-4 w-4" />
                Capture Palm
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox 
          id="consent" 
          checked={consentGiven}
          onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
          className="data-[state=checked]:bg-cosmic-purple data-[state=checked]:text-white border-cosmic-purple/50"
        />
        <label
          htmlFor="consent"
          className="text-sm text-cosmic-light-purple/80"
        >
          I consent to the analysis of my palm for destiny reading purposes
        </label>
      </div>

      <Button 
        onClick={capturePalmImage}
        disabled={isScanning || !isCameraActive || !consentGiven}
        className="cosmic-button w-full flex items-center justify-center"
      >
        {isScanning ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Scan className="h-5 w-5" />
            </motion.div>
            Analyzing Palm...
          </>
        ) : (
          <>
            <Scan className="mr-2 h-5 w-5" />
            Reveal Your Destiny
          </>
        )}
      </Button>
    </div>
  );
};

export default PalmScanner;
