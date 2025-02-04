"use client";

import { ChosenSenate } from "@/app/page";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DropDownMenuProps {
  senatorNames: string[];
}

export function DropDownMenu({ senatorNames }: DropDownMenuProps) {
  const { senateSelected, setSenateSelected } = React.useContext(ChosenSenate);
  const [selectedSenator, setSelectedSenator] = useState<string>(
    senatorNames[0] || "Select Senator"
  );

  const handleSelect = (senatorName: string) => {
    setSelectedSenator(senatorName);
    const senatorNumber = senatorName.split(".")[0];
    setSenateSelected(senatorNumber);

    console.log(senatorNumber);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedSenator}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 max-h-60 overflow-y-auto"
        align="start"
        side="bottom"
      >
        <DropdownMenuLabel>Senator Names</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedSenator}
          onValueChange={handleSelect}
          className="scroll-auto"
        >
          {senatorNames
            .sort((a, b) => {
              const numA = parseInt(a[0].split(".")[0], 10); // Extract number from "2. ADONIS, JEROME"
              const numB = parseInt(b[0].split(".")[0], 10);
              return numA - numB; // Sort numerically
            })
            .map((senator) => (
              <DropdownMenuRadioItem value={senator[0]} key={senator[0]}>
                {senator[0]}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
