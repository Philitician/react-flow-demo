"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import { ELECTRICAL_SYMBOLS } from "./symbols";
import { useToolStore } from "@/tool-store/provider";

export function ElectricalSymbolsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const setPendingSymbol = useToolStore((state) => state.setPendingSymbol);
  const setSelectedTool = useToolStore((state) => state.setSelectedTool);

  const handleSymbolClick = (symbol: (typeof ELECTRICAL_SYMBOLS)[number]) => {
    setPendingSymbol(symbol);
    setSelectedTool("symbol");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid grid-cols-5 gap-2">
          {ELECTRICAL_SYMBOLS.map((symbol) => (
            <TooltipProvider key={symbol.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 w-12 p-0"
                    onClick={() => handleSymbolClick(symbol)}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      dangerouslySetInnerHTML={{ __html: symbol.svg }}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{symbol.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
