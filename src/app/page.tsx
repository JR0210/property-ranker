"use client";

import { useState, useEffect, useMemo } from "react";
import { Roboto_Serif } from "next/font/google";
import PropertyAdd from "@/components/PropertyAdd";
import PropertiesContext from "@/PropertiesContext";
import PropertyCard from "@/components/PropertyCard";
import { convertCurrencyToNumber } from "@/utils";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export default function Home() {
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");

  function handleSelectChange(event: any): void {
    console.log(event, event.target.value, "event.target.value");
    setSelectedOption(event.target.value);
  }

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
        setPropertyData((prevData) => {
          const newData = [...prevData];
          const dataIndex = newData.findIndex((item) => item.url === data.url);
          if (dataIndex !== -1) {
            newData[dataIndex] = data;
          }
          return newData;
        });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      }

      setLoading(false);
    }

    if (propertyUrls.length > 0) {
      setPropertyData(propertyUrls.map((url) => ({ url, loading: true })));
      fetchData();
    }
  }, [propertyUrls]);

  const sortedPropertyData = useMemo(() => {
    console.log(selectedOption, "selectedOption");
    if (!selectedOption) return propertyData;

    const sortedData = [...propertyData];
    sortedData.sort((a: any, b: any): any => {
      switch (selectedOption) {
        case "Price":
          return (
            convertCurrencyToNumber(a.price) - convertCurrencyToNumber(b.price)
          );
        case "Bedrooms":
          return (
            +a.property?.propertyInfo?.bedrooms -
            +b.property?.propertyInfo?.bedrooms
          );
        case "Bathrooms":
          return (
            +a.property?.propertyInfo?.bathrooms -
            +b.property?.propertyInfo?.bathrooms
          );
        case "Insurance rating area":
          return a.insuranceRatingArea - b.insuranceRatingArea;
        case "Crimes":
          return a.crimes - b.crimes;
        case "Stop & searches":
          return a.stopAndSearches - b.stopAndSearches;
        case "Restaurants":
          return a.restaurants - b.restaurants;
        default:
          return 0;
      }
    });

    console.log(sortedData, "sortedData");
    return sortedData;
  }, [propertyData, selectedOption]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-8">
      <h1 className="text-6xl font-bold tracking-tight">
        Compare your next{" "}
        <span className={`${robotoSerif.className} text-accent`}>home</span>
      </h1>

      <PropertiesContext.Provider value={{ propertyUrls, setPropertyUrls }}>
        <div className="grid grid-cols-3 gap-32">
          <div />
          <PropertyAdd loading={loading} />
          <div className="flex flex-row h-fit self-end gap-4">
            <select
              disabled={propertyUrls.length === 0 || loading}
              className="select select-accent disabled:opacity-50"
              onChange={handleSelectChange}
            >
              <option disabled selected hidden>
                Sort by
              </option>
              <option>Price</option>
              <option>Bedrooms</option>
              <option>Bathrooms</option>
              <option>Insurance rating area</option>
              <option>Crimes</option>
              <option>Stop & searches</option>
              <option>Restaurants</option>
            </select>
            <select
              className="select select-accent disabled:opacity-50"
              disabled={
                (propertyUrls.length === 0 || loading) && !selectedOption
              }
            >
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>

        {propertyData.length > 0 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedPropertyData.map((property: any, index: number) => (
              <PropertyCard
                key={index}
                propertyData={property}
                skeleton={property.loading}
              />
            ))}
          </div>
        )}
      </PropertiesContext.Provider>
    </main>
  );
}
