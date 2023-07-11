import Image from "next/image";
import Skeleton from "./Skeleton";
import {
  getPostcodeRatingArea,
  removePostcode,
  getPropertyTypeIcon,
} from "@/utils";
import LocationPinIcon from "@/icons/LocationPin";
import BedroomIcon from "@/icons/Bedroom";
import BathroomIcon from "@/icons/Bathroom";

const iconFill = "fill-neutral dark:fill-neutral-content";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const {
    property = {},
    crime = [],
    stopSearch = [],
    restaurants = {},
  } = propertyData;
  const { displayImage = "", address = {}, propertyInfo = {} } = property;
  const ratingArea = getPostcodeRatingArea(address.postcode?.outcode);
  const PropertyIcon = getPropertyTypeIcon(propertyInfo.propertyType);

  const renderPropertyInfoTop = () => (
    <div className="flex flex-row flex-start gap-4 mb-2">
      {PropertyIcon && (
        <div
          className="tooltip tooltip-right"
          data-tip={propertyInfo.propertyType}
        >
          <PropertyIcon fill={iconFill} size={32} />
        </div>
      )}
      <div className="w-0.5 h-full bg-neutral dark:bg-neutral-content" />
      <div className="flex flex-row justify-start items-center gap-2">
        <BedroomIcon fill={iconFill} size={32} />
        <span className="text-xl font-bold">x{propertyInfo.bedrooms}</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-2">
        <BathroomIcon fill={iconFill} size={32} />
        <span className="text-xl font-bold">x{propertyInfo.bathrooms}</span>
      </div>
    </div>
  );

  const renderAddressLink = () => (
    <a
      className={`flex flex-row justify-start items-center gap-2 ${
        skeleton && "cursor-not-allowed pointer-events-none"
      }`}
      href={`https://www.google.com/maps/@${address.location?.latitude},${address.location?.longitude},17z`}
      target="_blank"
    >
      <LocationPinIcon fill={iconFill} size={16} />
      <h2 className="card-title">
        {removePostcode(address.road)}, {address.postcode?.outcode}{" "}
        {address.postcode?.incode}
      </h2>
    </a>
  );

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
        {renderPropertyInfoTop()}
        {renderAddressLink()}
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
          <a
            className="w-fit text-accent hover:text-accent-focus"
            href={property.broadband}
            target="_blank"
          >
            View broadband options
          </a>
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
          <Image
            src={displayImage}
            alt={address.road}
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </figure>
      <div className="card-body pt-6">
        {renderBody()}
        <div className="card-actions justify-end mt-auto">
          <a
            className={`btn btn-accent ${
              skeleton && "cursor-not-allowed pointer-events-none"
            }`}
          >
            {skeleton ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Open listing"
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
