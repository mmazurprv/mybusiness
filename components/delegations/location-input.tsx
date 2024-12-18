"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, MapPin } from "lucide-react";
import { getLocation } from "@/lib/actions/geolocation";

export default function LocationInput({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [location, setLocation] = useState(defaultValue);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationClick = async () => {
    setIsLocating(true);
    try {
      const location = await getLocation();
      setLocation(location);
    } catch (error) {
      alert("Unable to retrieve location. Please try again.");
      console.error("Location error:", error);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        name={name}
        className="w-full border rounded px-2 py-1"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={isLocating}
        onClick={handleLocationClick}
      >
        {isLocating ? <Loader /> : <MapPin />}
      </Button>
    </div>
  );
}
