export async function GET(): Promise<Response> {
  try {
    const crimeTypes = await fetch(
      "https://data.police.uk/api/crime-categories"
    );
    const crimeTypesJson = await crimeTypes.json();

    const formattedCrimeDict = crimeTypesJson.reduce((acc: any, crime: any) => {
      const { url, name } = crime;
      acc[url] = name;
      return acc;
    }, {});

    // Return a success response
    return new Response(
      JSON.stringify({
        message: "Success",
        data: formattedCrimeDict,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    // Return an error response
    return new Response(
      JSON.stringify({ message: error.message, error: true }),
      { status: 500 }
    );
  }
}
