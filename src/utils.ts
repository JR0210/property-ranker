export function splitPostOutcode(outcode: string): string[] {
  const index = outcode.search(/\d/); // Find the index of the first digit
  const result = [
    outcode.substring(0, index), // Get the substring before the digit
    outcode.substring(index)     // Get the substring starting from the digit
  ];

  return result;
}