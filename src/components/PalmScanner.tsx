
import React, { useState, useRef, useEffect } from "react";
import { Scan, Camera, Pause, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { analyzePalmImage } from "@/utils/apiService";

interface PalmScannerProps {
  onScanComplete: (destinyNumber: number, palmFeatures?: any) => void;
}

const PalmScanner = ({ onScanComplete }: PalmScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [useEnhancedAPI, setUseEnhancedAPI] = useState(false);
  const [processingPercentage, setProcessingPercentage] = useState(0);
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

  const capturePalmImage = async () => {
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
    setProcessingPercentage(0);

    // Animation for processing percentage
    const processingInterval = setInterval(() => {
      setProcessingPercentage(prev => {
        const newValue = prev + Math.random() * 15;
        return newValue > 95 ? 95 : newValue;
      });
    }, 250);

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

        // Get image data for API processing
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        
        try {
          // Use the API service for palm analysis
          const analysisResult = await analyzePalmImage(imageData, useEnhancedAPI);
          
          clearInterval(processingInterval);
          setProcessingPercentage(100);
          
          if (analysisResult.success) {
            toast({
              title: "Palm Analysis Complete",
              description: useEnhancedAPI 
                ? `Analysis completed with ${Math.round(analysisResult.confidence * 100)}% confidence` 
                : "Your palm has been analyzed successfully!",
              variant: "default",
            });
            
            // Submit the destiny number and additional palm features if available
            onScanComplete(
              analysisResult.destinyNumber, 
              analysisResult.palmFeatures
            );
          } else {
            toast({
              title: "Analysis Failed",
              description: analysisResult.error || "Could not determine your destiny number",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error during palm analysis:", error);
          toast({
            title: "Processing Error",
            description: "An error occurred while analyzing your palm",
            variant: "destructive",
          });
        } finally {
          clearInterval(processingInterval);
          setIsScanning(false);
        }
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
      
      <div className="flex items-center space-x-2 mb-4">
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

      <div className="flex items-center space-x-2 mb-6">
        <div className="flex items-center flex-1 space-x-2">
          <Switch
            id="enhanced-mode"
            checked={useEnhancedAPI}
            onCheckedChange={setUseEnhancedAPI}
            className="data-[state=checked]:bg-cosmic-gold"
          />
          <label
            htmlFor="enhanced-mode"
            className="text-sm font-medium text-cosmic-light-purple cursor-pointer"
          >
            Enhanced Analysis Mode
          </label>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-cosmic-light-purple/60 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="bg-cosmic-dark border-cosmic-purple/50 text-cosmic-light-purple">
              <p className="max-w-xs">
                Enhanced mode uses our advanced API for higher accuracy palm readings, 
                including detection of life lines, heart lines, and fate lines.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
            Analyzing Palm... {processingPercentage.toFixed(0)}%
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
