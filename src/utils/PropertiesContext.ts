"use client";

import { createContext } from "react";

interface PropertiesContextType {
  propertyUrls: string[];
  setPropertyUrls: (propertyUrls: string[]) => void;
}

const PropertiesContext = createContext({
  propertyUrls: [],
  setPropertyUrls: () => {},
} as PropertiesContextType);

export default PropertiesContext;
