"use client";

import { createContext } from "react";
import { CrimeURL } from "@/types";

interface PropertiesContextType {
  propertyUrls: string[];
  setPropertyUrls: (propertyUrls: string[]) => void;
  crimeTypes: CrimeURL[];
}

const PropertiesContext = createContext({
  propertyUrls: [],
  setPropertyUrls: () => {},
  crimeTypes: [],
} as PropertiesContextType);

export default PropertiesContext;
