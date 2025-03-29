
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  return (
    <div className="mb-8">
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
  );
};

export default DateSelector;
