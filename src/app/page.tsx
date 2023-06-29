import { getPostcodeRatingArea } from "../utils";
import { Roboto_Serif } from "next/font/google";
import PropertyAdd from "./components/PropertyAdd";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });
// TODO APIs/Endpoints to use
// https://google.com/maps/search/WC2N+5DU
// https://api.postcodes.io/postcodes/WC2N%205DU
// https://uk.api.just-eat.io/docs#operation/restaurantsBypostcodePostcodeGet - deprecated (no new call?)
// https://data.police.uk/docs/method/crime-street/
// https://data.police.uk/docs/method/stops-street/
// Get highest internet speed from rightmove page model
// // Create hardcoded object & Map of insurance rating areas for postcodes

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-8">
      <h1 className="text-6xl font-bold tracking-tight">
        Compare your next{" "}
        <span className={`${robotoSerif.className} text-accent`}>home</span>
      </h1>

      <div>
        <PropertyAdd />
      </div>
    </main>
  );
}
