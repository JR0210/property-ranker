"use client";

import { createContext } from "react";
import { CrimeTypes } from "@/types";

interface PropertiesContextType {
  propertyUrls: string[];
  setPropertyUrls: (propertyUrls: string[]) => void;
  crimeTypes: CrimeTypes;
}

const PropertiesContext = createContext({
  propertyUrls: [],
  setPropertyUrls: () => {},
  crimeTypes: {},
} as PropertiesContextType);

export default PropertiesContext;
