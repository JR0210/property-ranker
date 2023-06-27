import { PostcodesInterface } from "./constants";

export function splitPostOutcode(outcode: string): string[] {
  const index = outcode.search(/\d/); // Find the index of the first digit
  const result = [
    outcode.substring(0, index), // Get the substring before the digit
    outcode.substring(index), // Get the substring starting from the digit
  ];

  return result;
}

export function createPostcodeMap(data: PostcodesInterface): Map<any, any> {
  const nestedMap = new Map();

  for (const parentKey in data) {
    if (data.hasOwnProperty(parentKey)) {
      const childObject = data[parentKey];
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
