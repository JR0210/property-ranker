"use client";

import { useState, useEffect, useMemo } from "react";
import { Roboto_Serif } from "next/font/google";
import PropertyAdd from "@/components/PropertyAdd";
import PropertiesContext from "@/utils/PropertiesContext";
import PropertyCard from "@/components/PropertyCard";
import { convertCurrencyToNumber } from "@/utils";
import useBreakpoint from "@/utils/useBreakpoint";
import { CrimeURL } from "@/types";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export default function Home() {
  const breakpoint = useBreakpoint();
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOrder, setOrderOption] = useState("Ascending");
  const [crimeTypes, setCrimeTypes] = useState<CrimeURL[]>([]);

  function handleSelectChange(event: any): void {
    setSelectedOption(event.target.value);
  }

  function handleOrderChange(event: any): void {
    setOrderOption(event.target.value);
  }

  useEffect(() => {
    async function fetchCrimeTypes() {
      const res = await fetch("/api/crime-types");
      const jsonRes = await res.json();
      setCrimeTypes(jsonRes.data);
    }

    fetchCrimeTypes();
  }, [])

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
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 ms
      }

      setLoading(false);
    }

    if (propertyUrls.length > 0) {
      setPropertyData(propertyUrls.map((url) => ({ url, loading: true })));
      fetchData();
    }
  }, [propertyUrls]);

  const sortedPropertyData = useMemo(() => {
    if (!selectedOption) return propertyData;

    const sortedData = [...propertyData];
    sortedData.sort((a: any, b: any): any => {
      switch (selectedOption) {
        case "Price":
          return (
            convertCurrencyToNumber(a.property?.propertyInfo?.price) -
            convertCurrencyToNumber(b.property?.propertyInfo?.price)
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
          return a.property?.propertyInfo?.ratingArea?.localeCompare(b.property?.propertyInfo?.ratingArea);
        case "Crimes":
          return a.crime?.length - b.crime?.length;
        case "Stop & searches":
          return a.stopSearch?.length - b.stopSearch?.length;
        case "Restaurants":
          return (
            a.restaurants?.Restaurants?.length -
            b.restaurants?.Restaurants?.length
          );
        default:
          return 0;
      }
    });

    return selectedOrder === 'Ascending' ? sortedData : sortedData.reverse();
  }, [propertyData, selectedOption, selectedOrder]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-4 px-8 lg:py-10 lg:px-24 gap-8">
      <h1 className="text-2xl lg:text-4xl 2xl:text-6xl font-bold tracking-tight text-center">
        Compare your next{" "}
        <span className={`${robotoSerif.className} text-accent`}>home</span>
      </h1>

      <PropertiesContext.Provider value={{ propertyUrls, setPropertyUrls, crimeTypes }}>
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
              onChange={handleOrderChange}
            >
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>

        {propertyData.length > 0 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {sortedPropertyData.map((property: any, index: number) => (
              <PropertyCard
                key={index}
                propertyData={property}
                skeleton={property.loading}
                breakpoint={breakpoint}
              />
            ))}
          </div>
        )}
      </PropertiesContext.Provider>
    </main>
  );
}
