"use client";

import { ChosenSenate, ChosenDepartment } from "@/app/page";
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
  senatorNames: any[];
}

export function DropDownMenu({ senatorNames }: DropDownMenuProps) {
  const senateContext = React.useContext(ChosenSenate);
  const departmentContext = React.useContext(ChosenDepartment);

  const [selectedSenator, setSelectedSenator] = useState<string>(
    senateContext
      ? senatorNames[0] || "Select Senator"
      : senatorNames[0] || "Select Department"
  );

  const handleSelect = (senatorName: string) => {
    setSelectedSenator(senatorName);

    if (senateContext) {
      const senatorNumber = senatorName.split(".")[0];
      // Senate context is active
      senateContext.setSenateSelected(senatorNumber);
      console.log("Senate selected:", senatorNumber);
    } else if (departmentContext) {
      // Department context is active
      departmentContext.setDepartmentSelected(senatorName);
      console.log("Department selected:", senatorName);
    } else {
      console.warn("No context available!");
    }
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
        {senateContext ? (
          <DropdownMenuLabel>Senator Names</DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel>Departments</DropdownMenuLabel>
        )}

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
