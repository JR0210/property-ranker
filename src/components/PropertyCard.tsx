import Image from "next/image";
import Skeleton from "./Skeleton";
import { removePostcode, getPropertyTypeIcon } from "@/utils";
import LocationPinIcon from "@/icons/LocationPin";
import BedroomIcon from "@/icons/Bedroom";
import BathroomIcon from "@/icons/Bathroom";
import CarIcon from "@/icons/Car";
import CrimeIcon from "@/icons/Crime";
import FoodIcon from "@/icons/Food";

const iconFill = "fill-neutral dark:fill-neutral-content";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const {
    property = {},
    crime = [],
    stopSearch = [],
    restaurants = {},
    url,
  } = propertyData;
  const {
    displayImage = "",
    address = {},
    propertyInfo = {},
  } = property;
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
    <>
      <a
        className={`flex flex-row justify-start items-center gap-2 transition-all duration-200 hover:opacity-80 ${
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
      <h3 className="text-xl leading-5 font-semibold">{propertyInfo.price}</h3>
    </>
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

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex flex-col items-start">
            <CarIcon fill={iconFill} size={24} />
            <span>
              Insurance rating area: <b>{propertyInfo.ratingArea}</b>
            </span>
          </div>

          <div className="flex flex-col items-start">
            <CrimeIcon fill={iconFill} size={24} />
            <span>
              No. of crimes in area: <b>{crime.length}</b>
            </span>
            <span>
              No. of stop & search in area: <b>{stopSearch.length}</b>
            </span>
          </div>

          <div className="flex flex-col items-start">
            <FoodIcon fill={iconFill} size={24} />
            <span>
              No. of delivery restaurants:{" "}
              <b>{(restaurants.Restaurants || []).length}</b>
            </span>
          </div>
          <a
            className="w-fit text-accent hover:text-accent-focus col-span-2"
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
              skeleton && "btn-disabled cursor-not-allowed pointer-events-none"
            }`}
            href={url}
            target="_blank"
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
