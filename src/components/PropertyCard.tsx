import Image from "next/image";
import Skeleton from "./Skeleton";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const { property = {}, crime = [], stopSearch = [], restaurants = {} } = propertyData;
  const { displayImage = "", address = {}, propertyInfo = {} } = property;

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
        <h2 className="card-title">{address.road}, {address.postcode?.outcode} {address.postcode?.incode}</h2>
        <h3 className="card-title">{propertyInfo.price}</h3>
        <span>No. of crimes in area: {crime.length}</span>
        <span>No. of stop & search in area: {stopSearch.length}</span>
        <span>No. of delivery restaurants: {(restaurants.Restaurants || []).length}</span>
      </>
    );
  };

  return (
    <div className="card w-96 shadow-xl bg-base-300">
      <figure className="flex flex-center bg-base-200 h-72 relative text-">
        {skeleton ? (
          <div className="loading loading-lg"></div>
        ) : (
          <Image src={displayImage} alt={address.road} fill />
        )}
      </figure>
      <div className="card-body">
        {renderBody()}
        <div className="card-actions justify-end">
          <button className="btn btn-accent" disabled={skeleton}>
            {skeleton ? <span className="loading loading-spinner"></span> : 'View'}
          </button>
        </div>
      </div>
    </div>
  );
}
