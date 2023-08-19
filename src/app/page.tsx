"use client";

import { useState, useEffect, useMemo } from "react";
import { Roboto_Serif } from "next/font/google";
import PropertyAdd from "@/components/PropertyAdd";
import PropertiesContext from "@/utils/PropertiesContext";
import PropertyCard from "@/components/PropertyCard";
import { handleSort } from "@/utils";
import useBreakpoint from "@/utils/useBreakpoint";
import { CrimeTypes } from "@/types";
import SortInputs from "@/components/SortInputs";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export default function Home() {
  const breakpoint = useBreakpoint();
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOrder, setOrderOption] = useState("Ascending");
  const [crimeTypes, setCrimeTypes] = useState<CrimeTypes>({});
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);

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
  }, []);

  useEffect(() => {
    async function makeAPICall(url: string) {
      const query = new URLSearchParams({ crimeRadius: "0.5" });
      const res = await fetch("/api/properties?" + query, {
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
    sortedData.sort((a: any, b: any): any => handleSort(a, b, selectedOption));

    return selectedOrder === "Ascending" ? sortedData : sortedData.reverse();
  }, [propertyData, selectedOption, selectedOrder]);

  return (
    <>
      <button
        className="flex lg:hidden fixed z-30 btn btn-accent btn-square shadow-lg top-4 left-4 lg:top-8 lg:left-8"
        onClick={() => setBurgerOpen((prevState) => !prevState)}
      >
        {burgerOpen ? (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.707 16.707a1 1 0 010-1.414L8.586 10 3.707 5.121a1 1 0 111.414-1.414L10 8.586l4.879-4.879a1 1 0 111.414 1.414L11.414 10l4.879 4.879a1 1 0 11-1.414 1.414L10 11.414l-4.879 4.879a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
      <div
        className={`${
          burgerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all gap-4 text-center items-center bg-base-100 absolute h-screen w-screen z-20`}
      >
        <SortInputs
          loading={loading}
          propertyUrls={propertyUrls}
          handleSelectChange={handleSelectChange}
          selectedOption={selectedOption}
          handleOrderChange={handleOrderChange}
          type="burger"
        />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-start py-4 px-8 lg:py-10 lg:px-24 gap-8">
        <h1 className="text-2xl lg:text-4xl 2xl:text-6xl font-bold tracking-tight text-center">
          Compare your next{" "}
          <span className={`${robotoSerif.className} text-accent`}>home</span>
        </h1>

        <PropertiesContext.Provider
          value={{ propertyUrls, setPropertyUrls, crimeTypes }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            <div />
            <PropertyAdd loading={loading} />
            <SortInputs
              loading={loading}
              propertyUrls={propertyUrls}
              handleSelectChange={handleSelectChange}
              selectedOption={selectedOption}
              handleOrderChange={handleOrderChange}
            />
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
    </>
  );
}
