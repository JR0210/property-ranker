import Image from "next/image";

export default function PropertyCard({ propertyData }: any) {
  console.log(propertyData, "propertyData");
  const { property = {} } = propertyData;
  const { displayImage = '', address = {} } = property;
  console.log(displayImage, "displayImage");
  return (
    <div className="card w-96 bg-neutral shadow-xl">
      <figure>
        <Image
          src={displayImage}
          alt={address.road}
          width={1000}
          height={1000}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Property</h2>
        <p>Property Description</p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent">View</button>
        </div>
      </div>
    </div>
  );
}
