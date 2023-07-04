export async function POST(request: Request) {
  try {
    // Retrieve the array of URLs from the request body
    const { url }: { url: string } = await request.json();
    console.log(url, "url");

    // Validate that all URLs contain "rightmove.co.uk"
    const urlValid = url.includes("rightmove.co.uk");
    if (!urlValid) {
      throw new Error(`URL ${url} does not contain 'rightmove.co.uk'.`);
    }

    // Return a success response
    return new Response(JSON.stringify({ message: "Success", data: { name: "John Doe", age: 30 } }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    // Return an error response
    return new Response(JSON.stringify({ message: error.message, error: true }), { status: 400 });
  }
}
