import { JSDOM } from "jsdom";

function sanitizeJSONString(jsonString: string): { [key: string]: any } {
  // Remove line breaks and excessive whitespace
  const trimmedString = jsonString.replace(/\s{2,}/g, " ").trim();

  // Parse the trimmed string to validate the JSON
  let parsedJSON: any;
  try {
    parsedJSON = JSON.parse(trimmedString);
  } catch (error) {
    // If parsing fails, return an empty object
    return {};
  }

  return parsedJSON;
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Retrieve the array of URLs from the request body
    const { url }: { url: string } = await request.json();

    // Validate that all URLs contain "rightmove.co.uk"
    const urlValid = url.includes("rightmove.co.uk");
    if (!urlValid) {
      throw new Error(`URL ${url} does not contain 'rightmove.co.uk'.`);
    }

    // Retrieve the HTML from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Retrieve the property details by finding the script tag containing window.PAGE_MODEL =
    const scripts = Array.from(
      document.querySelectorAll("script")
    ) as HTMLScriptElement[];
    const script = scripts.find((script) =>
      script.textContent?.includes("window.PAGE_MODEL =")
    );
    if (!script) {
      throw new Error("Unable to find the property details.");
    }

    const propertyDetailsString = script.textContent?.replace(
      "window.PAGE_MODEL = ",
      ""
    );

    const sanitizedJson = sanitizeJSONString(propertyDetailsString || "");

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
      },
      displayImage: images[0]?.src,
      broadband: `https://www.broadbandchoices.co.uk/packages/new-grid/default?location=${address.outcode}+${address.incode}#/?sortBy=Speed`,
      propertyInfo: {
        propertyType: propertySubType,
        bedrooms,
        bathrooms,
        price: prices.primaryPrice,
        similarProperties: propertyUrls.similarPropertiesUrl,
        soldNearBy: propertyUrls.nearbySoldPropertiesUrl,
      },
      listingUpdate: listingHistory?.listingUpdateReason,
      councilTax: livingCosts?.councilTaxBand,
    };

    const justeatRes = await fetch(
      `https://uk.api.just-eat.io/restaurants/bypostcode/${address.outcode}${address.incode}`
    );
    const justeatRestaurants = await justeatRes.json();
    
    const finalPropertyDetails = {
      property: rightMoveDetails,
      restaurants: justeatRestaurants,
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
