"use client";

import { useState, useEffect } from "react";
import { Roboto_Serif } from "next/font/google";
import PropertyAdd from "@/components/PropertyAdd";
import PropertiesContext from "@/PropertiesContext";
import PropertyCard from "@/components/PropertyCard";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export default function Home() {
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function makeCall() {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: propertyUrls[0] }),
      });
      console.log(res, "res");
      const data = await res.json();
      console.log(data.data, "data");
      setPropertyData([data.data]);
      setLoading(false);
      return [data];
    }

    if (propertyUrls.length > 0) {
      setLoading(true);
      makeCall();
    }
  }, [propertyUrls]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-8">
      <h1 className="text-6xl font-bold tracking-tight">
        Compare your next{" "}
        <span className={`${robotoSerif.className} text-accent`}>home</span>
      </h1>

      <PropertiesContext.Provider value={{ propertyUrls, setPropertyUrls }}>
        <div>
          <PropertyAdd />
        </div>
        {loading && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {propertyData.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {propertyData.map((property: any, index: number) => (
              <PropertyCard key={index} propertyData={property} />
            ))}
          </div>
        )}
      </PropertiesContext.Provider>
    </main>
  );
}
