import { postcodes } from "./constants";
import BungalowIcon from "./icons/Bungalow";
import DetachedIcon from "./icons/Detached";
import SemidetachedIcon from "./icons/Semidetached";
import TerracedIcon from "./icons/Terraced";
import FlatIcon from "./icons/Flat";

export function createPostcodeMap(): Map<any, any> {
  const nestedMap = new Map();

  for (const parentKey in postcodes) {
    if (postcodes.hasOwnProperty(parentKey)) {
      const childObject = postcodes[parentKey];
      const parentMap = new Map();

      for (const childKey in childObject) {
        if (childObject.hasOwnProperty(childKey)) {
          const childArray = childObject[childKey];
          for (const childValue of childArray) {
            if (!parentMap.has(childValue)) {
              parentMap.set(childValue, []);
            }
            parentMap.get(childValue).push(childKey);
          }
        }
      }

      nestedMap.set(parentKey, parentMap);
    }
  }

  return nestedMap;
}

const postcodeMap = createPostcodeMap();

export function splitOutcode(
  outcode: string
): { letters: string; numeric: number } | null {
  const outcodeMatches = outcode.match(/^([A-Za-z]+)(\d+)/);
  if (outcodeMatches) {
    const [, letters, numeric] = outcodeMatches;
    return { letters, numeric: parseInt(numeric, 10) };
  }

  return null;
}

export function getPostcodeRatingArea(outcode: string): string | null {
  if (!outcode) return null;
  const outcodeHalves = splitOutcode(outcode);
  if (!outcodeHalves) return null;

  const { letters, numeric } = outcodeHalves;
  if (postcodeMap.has(letters)) {
    const parentMap = postcodeMap.get(letters);
    if (parentMap.has(numeric)) {
      const ratingArea = parentMap.get(numeric);
      return Array.isArray(ratingArea) ? ratingArea[0] : ratingArea;
    }

    return "Refer";
  }

  return null;
}

export function validateUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname.includes("rightmove.co.uk");
  } catch (_) {
    return false;
  }
}

export function removePostcode(str: string): string {
  if (!str) return "";
  const pattern = /,\s*[A-Z]{1,2}\d{1,2}(?:\s*\d\w{2})?/;
  const result = str.replace(pattern, "");
  return result.trim();
}

function getPossibleTypes(type: string): any {
  const lowerCaseType = type.toLowerCase();
  if (
    ["apartment", "penthouse"].includes(lowerCaseType) ||
    lowerCaseType.includes("flat")
  )
    return FlatIcon;
  if (lowerCaseType.includes("bungalow")) return BungalowIcon;
  if (
    lowerCaseType.includes("terrace") ||
    ["town house", "mews"].includes(lowerCaseType)
  )
    return TerracedIcon;
  return DetachedIcon;
}

export function getPropertyTypeIcon(type: string = ""): any {
  switch (type.toLowerCase()) {
    case "detached":
      return DetachedIcon;
    case "semi-detached":
      return SemidetachedIcon;
    case "terraced":
      return TerracedIcon;
    case "bungalow":
      return BungalowIcon;
    case "flat":
      return FlatIcon;
    default:
      return getPossibleTypes(type);
  }
}

export function convertCurrencyToNumber(currencyString: string): number {
  const numericString = currencyString.replace(/[^0-9.-]+/g, "");
  const numericValue = parseFloat(numericString);
  return numericValue;
}

export function handlePasteFormatting(
  clipboardData: DataTransfer
): string[] | void {
  const pastedData = clipboardData.getData("Text");
  const items = pastedData.split("\n").filter((item) => item !== "");

  let urls = [];
  let error: string | null = null;
  for (let i = 0; i < items.length; i++) {
    if (!validateUrl(items[i])) {
      error = "Pasted data includes invalid URLs";
      break;
    }
    urls[i] = items[i].trim();
  }

  if (urls.length > 20) error = "Pasted data includes too many URLs";
  if (urls.length === 0) error = "Pasted data includes no URLs";

  if (error) {
    return;
  }

  return urls;
}

export function handleSort(
  a: any,
  b: any,
  selectedOption: string | undefined
): number {
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
      return a.property?.propertyInfo?.ratingArea?.localeCompare(
        b.property?.propertyInfo?.ratingArea
      );
    case "Crimes":
      return a.crime?.length - b.crime?.length;
    case "Stop & searches":
      return a.stopSearch?.length - b.stopSearch?.length;
    case "Restaurants":
      return (
        a.restaurants?.Restaurants?.length - b.restaurants?.Restaurants?.length
      );
    default:
      return 0;
  }
}

export function generateURLsFromIds(ids: string[]): string[] {
  const baseURL = "https://www.rightmove.co.uk/properties/";
  return ids.map((id) => `${baseURL}${id}`);
}
