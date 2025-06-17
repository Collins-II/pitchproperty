"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PickupDropoffFormProps {
  pickupLocation: string;
  dropoffLocation: string;
  onPickupChange: (value: string) => void;
  onDropoffChange: (value: string) => void;
}

const PickupDropoffForm: React.FC<PickupDropoffFormProps> = ({
  pickupLocation,
  dropoffLocation,
  onPickupChange,
  onDropoffChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="pickup">Pickup Location</Label>
        <Input
          id="pickup"
          value={pickupLocation}
          onChange={(e) => onPickupChange(e.target.value)}
          placeholder="Enter pickup location"
        />
      </div>
      <div>
        <Label htmlFor="dropoff">Drop-off Location</Label>
        <Input
          id="dropoff"
          value={dropoffLocation}
          onChange={(e) => onDropoffChange(e.target.value)}
          placeholder="Enter drop-off location"
        />
      </div>
    </div>
  );
};

export default PickupDropoffForm;
