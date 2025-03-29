
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getZodiacSign } from "@/utils/zodiacCalculator";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  const zodiacInfo = React.useMemo(() => {
    if (!date) return null;
    const sign = getZodiacSign(date);
    return sign;
  }, [date]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-cosmic-light-purple text-xl mb-2 font-medium">
          Enter Your Date of Birth
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full md:w-[280px] text-left font-normal border-cosmic-purple/30 bg-cosmic-dark/40 hover:bg-cosmic-dark/60 hover:border-cosmic-purple/50 backdrop-blur-sm",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-cosmic-purple" />
              {date ? format(date, "MMMM d, yyyy") : <span>Select your birth date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-cosmic-purple/30 bg-cosmic-dark/90 backdrop-blur-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto bg-transparent")}
              disabled={(date) => date > new Date()}
              classNames={{
                day_selected: "bg-cosmic-purple text-white hover:bg-cosmic-purple/90",
                day_today: "bg-accent/10 text-accent",
                day: "hover:bg-cosmic-purple/20"
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {date && zodiacInfo && (
        <div className="cosmic-card bg-cosmic-dark/30 border border-cosmic-purple/20 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cosmic-light-purple">Birth Insights</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-cosmic-purple/70">
                    <InfoIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>These insights are based on astrological interpretations of your birth date.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Zodiac Sign</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.name}</p>
            </div>

            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Energy Pattern</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.element} energy - {zodiacInfo.elementDescription}</p>
            </div>

            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Ruling Planet</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.rulingPlanet}</p>
            </div>

            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Key Traits</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.traits.join(", ")}</p>
            </div>

            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Be Mindful Of</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.challenges}</p>
            </div>

            <div>
              <h4 className="text-cosmic-gold font-medium mb-1">Life Path Focus</h4>
              <p className="text-cosmic-light-purple/90">{zodiacInfo.lifePathFocus}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
