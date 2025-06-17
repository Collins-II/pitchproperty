"use client";

import ToggleGroup from "@/components/ui/toggle-group/ToggleGroup";
import ToggleGroupItem from "@/components/ui/toggle-group/ToggleGroupItem";
import React from "react";

interface ToggleListingTypeProps {
  listingType: "Rent" | "Sale";
  onChange: (type: "Rent" | "Sale") => void;
}

const ToggleListingType: React.FC<ToggleListingTypeProps> = ({ listingType, onChange }) => {
  return (
    <ToggleGroup value={listingType} onValueChange={(value) => onChange(value as "Rent" | "Sale")} className="flex space-x-2">
      <ToggleGroupItem value="Sale" selected={listingType === "Sale"}>
        Buy
      </ToggleGroupItem>
      <ToggleGroupItem value="Rent" selected={listingType === "Rent"}>
        Rent
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleListingType;
