import Image from "next/image";
import Skeleton from "./Skeleton";
import { getPostcodeRatingArea, removePostcode } from "@/utils";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const {
    property = {},
    crime = [],
    stopSearch = [],
    restaurants = {},
  } = propertyData;
  const { displayImage = "", address = {}, propertyInfo = {} } = property;
  const ratingArea = getPostcodeRatingArea(address.postcode?.outcode);

  const renderBody = () => {
    if (skeleton) {
      return (
        <>
          <Skeleton />
          <Skeleton width="w-4/5" />
          <Skeleton width="w-1/2" />
        </>
      );
    }

    return (
      <>
        <h2 className="card-title">
          {removePostcode(address.road)}, {address.postcode?.outcode} {address.postcode?.incode}
        </h2>
        <h3 className="card-title">{propertyInfo.price}</h3>
        <div className="flex flex-col gap-2">
          <span>
            Insurance rating area: <b>{ratingArea}</b>
          </span>
          <div className="flex flex-col">
            <span>
              No. of crimes in area: <b>{crime.length}</b>
            </span>
            <span>
              No. of stop & search in area: <b>{stopSearch.length}</b>
            </span>
          </div>
          <span>
            No. of delivery restaurants:{" "}
            <b>{(restaurants.Restaurants || []).length}</b>
          </span>
          <a className="w-fit text-accent hover:text-accent-focus" href={property.broadband} target="_blank">View broadband options</a>
        </div>
      </>
    );
  };

  return (
    <div className="card w-full shadow-xl bg-base-300 border border-neutral-content dark:border-neutral">
      <figure className="flex flex-center bg-base-200 h-80 relative">
        {skeleton ? (
          <div className="loading loading-lg"></div>
        ) : (
          <Image src={displayImage} alt={address.road} style={{objectFit: "cover"}} fill />
        )}
      </figure>
      <div className="card-body">
        {renderBody()}
        <div className="card-actions justify-end">
          <button className="btn btn-accent mt-4" disabled={skeleton}>
            {skeleton ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Open listing"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
