import { postcodes } from "./constants";

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

export function splitOutcode(outcode: string): { letters: string, numeric: number } | null {
  const outcodeMatches = outcode.match(/^([A-Za-z]+)(\d+)/);
  if (outcodeMatches) {
    const [, letters, numeric] = outcodeMatches;
    return { letters, numeric: parseInt(numeric, 10) };
  }

  return null;
}

export function getPostcodeRatingArea(outcode: string): string | null {
  const outcodeHalves = splitOutcode(outcode);
  if (!outcodeHalves) return null;

  const { letters, numeric } = outcodeHalves;
  if (postcodeMap.has(letters)) {
    const parentMap = postcodeMap.get(letters);
    if (parentMap.has(numeric)) return parentMap.get(numeric);
    
    return 'Refer';
  }

  return null;
}