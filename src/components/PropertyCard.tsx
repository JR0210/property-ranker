import Image from "next/image";
import Skeleton from "./Skeleton";

export default function PropertyCard({ propertyData, skeleton }: any) {
  const { property = {} } = propertyData;
  const { displayImage = "", address = {} } = property;
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
        <h2 className="card-title">Property</h2>
        <Skeleton />
        <p>Property Description</p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent">View</button>
        </div>
      </div>
    </div>
  );
}
