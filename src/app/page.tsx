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
    async function makeAPICall(url: string) {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const jsonRes = await res.json();
      return jsonRes.data;
    }

    async function fetchData() {
      setLoading(true);

      for (let i = 0; i < propertyUrls.length; i++) {
        const data = await makeAPICall(propertyUrls[i]);
        setPropertyData(prevData => {
          const newData = [...prevData];
          const dataIndex = newData.findIndex(item => item.url === data.url);
          if (dataIndex !== -1) {
            newData[dataIndex] = data;
          }
          return newData;
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      }

      setLoading(false);
    }

    if (propertyUrls.length > 0) {
      setPropertyData(propertyUrls.map(url => ({ url, loading: true })));
      fetchData();
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
          <PropertyAdd loading={loading} />
        </div>

        {propertyData.length > 0 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {propertyData.map((property: any, index: number) => (
              <PropertyCard key={index} propertyData={property} skeleton={property.loading} />
            ))}
          </div>
        )}
      </PropertiesContext.Provider>
    </main>
  );
}
