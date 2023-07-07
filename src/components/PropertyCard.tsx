import Image from "next/image";
import Skeleton from "./Skeleton";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const { property = {} } = propertyData;
  const { displayImage = "", address = {} } = property;

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
        <h2 className="card-title">Property</h2>
        <p>Property Description</p>
      </>
    );
  };

  return (
    <div className="card w-96 shadow-xl">
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
