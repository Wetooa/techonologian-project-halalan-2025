"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropDownMenuProps {
    senatorNames: string[];
}

export function DropDownMenu({ senatorNames }: DropDownMenuProps) {
    const [selectedSenator, setSelectedSenator] = React.useState(senatorNames[0] || "Select Senator");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedSenator}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side="bottom">
                <DropdownMenuLabel>Senator Names</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedSenator} onValueChange={setSelectedSenator}>
                    {senatorNames.map((senatorName) => (
                        <DropdownMenuRadioItem value={senatorName} key={senatorName}>
                            {senatorName}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
