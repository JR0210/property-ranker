import { parse as nodeParser } from "node-html-parser";
import { getPostcodeRatingArea } from "@/utils";
import circle from "@turf/circle";
import { point, Units } from "@turf/helpers";
import { parse } from "url";

function sanitizeJSONString(jsonString: string): { [key: string]: any } {
  // Remove line breaks and excessive whitespace
  const trimmedString = jsonString.replace(/\s{2,}/g, " ").trim();

  let parsedJSON: any;
  try {
    parsedJSON = JSON.parse(trimmedString);
  } catch (error) {
    // If parsing fails, return an empty object
    return {};
  }

  return parsedJSON;
}

async function fetchCrimeData(
  lat: number,
  long: number,
  radius?: string,
  date?: string
) {
  if (typeof radius === "undefined" || radius === "1") {
    const crimeRes = await fetch(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${long}`
    );
    const crimeData = await crimeRes.json();

    const stopSearchRes = await fetch(
      `https://data.police.uk/api/stops-street?lat=${lat}&lng=${long}`
    );
    const stopSearchData = await stopSearchRes.json();

    return {
      crime: crimeData,
      stopSearch: stopSearchData,
    };
  }

  const center = point([long, lat]);
  const options = { steps: 64, units: "miles" } as {
    steps: number;
    units: Units;
  };

  const generatedCircle = circle(center, parseFloat(radius), options);

  const swappedCoordinates = generatedCircle.geometry.coordinates[0].map(
    (coord) => [coord[1], coord[0]]
  );
  const polygonString = swappedCoordinates
    .map((coord) => coord.join(","))
    .join(":");

  const crimeRes = await fetch(
    `https://data.police.uk/api/crimes-street/all-crime?poly=${polygonString}`
  );
  const crimeData = await crimeRes.json();

  const stopSearchRes = await fetch(
    `https://data.police.uk/api/stops-street?poly=${polygonString}`
  );
  const stopSearchData = await stopSearchRes.json();

  return {
    crime: crimeData,
    stopSearch: stopSearchData,
  };
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Retrieve the array of URLs from the request body
    const { url }: { url: string } = await request.json();
    // Check if query param for radius is present
    const { query } = parse(request.url || "", true);
    const { crimeRadius: radius } = query as { crimeRadius?: string };

    // Validate that all URLs contain "rightmove.co.uk"
    const urlValid = url.includes("rightmove.co.uk");
    if (!urlValid) {
      throw new Error(`URL ${url} does not contain 'rightmove.co.uk'.`);
    }

    // Retrieve the HTML from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML
    const root = nodeParser(html);

    if (root === null || typeof root === "undefined") {
      throw new Error("Unable to parse the HTML.");
    }

    // Retrieve the property details by finding the script tag containing window.PAGE_MODEL =
    const scripts = Array.from(root.querySelectorAll("script"));
    const script = scripts.find((script) =>
      script.textContent?.includes("window.PAGE_MODEL =")
    );

    if (!script) {
      throw new Error("Unable to find the property details.");
    }

    // Get the JSON object containing the property details, rightmove added more
    // objects to the script tag so we need to extract only PAGE_MODEL
    let scriptContent = script.textContent;
    let startIndex =
      scriptContent.indexOf("window.PAGE_MODEL") + "window.PAGE_MODEL".length;
    let objectStartIndex = scriptContent.indexOf("{", startIndex);
    let nextObjectIndex = scriptContent.indexOf("window.", objectStartIndex);

    let pageModelObject = scriptContent
      .substring(objectStartIndex, nextObjectIndex)
      .trim();

    // Remove trailing comma if it exists
    if (pageModelObject.endsWith(",")) {
      pageModelObject = pageModelObject.slice(0, -1);
    }

    const sanitizedJson = sanitizeJSONString(pageModelObject || "");

    // Retrieve the property details
    const { propertyData } = sanitizedJson;
    const {
      address,
      propertySubType,
      images = [],
      bathrooms,
      bedrooms,
      location,
      prices,
      propertyUrls,
      listingHistory,
      livingCosts,
    } = propertyData;

    const rightMoveDetails = {
      address: {
        road: address.displayAddress,
        postcode: { outcode: address.outcode, incode: address.incode },
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        deliveryPointId: address.deliveryPointId,
        mapsLocation: `https://google.com/maps/search/${address.outcode}+${address.incode}`,
      },
      displayImage: images[0]?.url,
      broadband: `https://www.broadbandchoices.co.uk/packages/new-grid/default?location=${address.outcode}+${address.incode}#/?sortBy=Speed`,
      propertyInfo: {
        propertyType: propertySubType,
        bedrooms,
        bathrooms,
        price: prices.primaryPrice,
        similarProperties: propertyUrls.similarPropertiesUrl,
        soldNearBy: propertyUrls.nearbySoldPropertiesUrl,
        ratingArea: getPostcodeRatingArea(address.outcode),
      },
      listingUpdate: listingHistory?.listingUpdateReason,
      councilTax: livingCosts?.councilTaxBand,
    };

    const justeatRes = await fetch(
      `https://uk.api.just-eat.io/restaurants/bypostcode/${address.outcode}${address.incode}`
    );
    const justeatRestaurants = await justeatRes.json();

    const crimeData =
      (await fetchCrimeData(location.latitude, location.longitude, radius)) ||
      {};

    const finalPropertyDetails = {
      url,
      property: rightMoveDetails,
      restaurants: justeatRestaurants,
      ...crimeData,
    };

    // Return a success response
    return new Response(
      JSON.stringify({
        message: "Success",
        data: finalPropertyDetails,
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
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request): Promise<Response> {
  // Retrieve the URL to update from the request body
  const {
    propertyProps,
    key,
    value,
  }: { propertyProps: any; key: string; value: string } = await request.json();
  let data;
  switch (key) {
    case "crime":
      if (!propertyProps?.latitude || !propertyProps?.longitude) {
        throw new Error("Latitude and longitude are required.");
      }
      const crimeData = await fetchCrimeData(
        propertyProps?.latitude,
        propertyProps?.longitude,
        value
      );
      data = crimeData;
      break;
  }

  return new Response(JSON.stringify({ message: "Success", data }), {
    status: 200,
  });
}
