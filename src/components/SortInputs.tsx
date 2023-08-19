export default function SortInputs({
  loading,
  propertyUrls,
  handleSelectChange,
  selectedOption,
  handleOrderChange,
  selectedOrder,
}) {
  return (
    <div className="hidden lg:flex flex-col h-fit self-end gap-4">
      <select
        className="select select-accent w-fit disabled:opacity-50"
        disabled={loading}
        defaultValue="Crime Radius"
      >
        <option disabled hidden>
          Crime Radius
        </option>
        <option value="0.25">1/4 Mile</option>
        <option value="0.5">1/2 Mile</option>
        <option value="0.75">3/4 Mile</option>
        <option value="1">1 Mile</option>
      </select>

      <div className="flex flex-row gap-4">
        <select
          disabled={propertyUrls.length === 0 || loading}
          className="select select-accent disabled:opacity-50"
          onChange={handleSelectChange}
          defaultValue="Sort by"
        >
          <option disabled hidden>
            Sort by
          </option>
          <option>Price</option>
          <option>Bedrooms</option>
          <option>Bathrooms</option>
          <option>Insurance rating area</option>
          <option>Crimes</option>
          <option>Stop & searches</option>
          <option>Restaurants</option>
        </select>
        <select
          className="select select-accent disabled:opacity-50"
          disabled={(propertyUrls.length === 0 || loading) && !selectedOption}
          onChange={handleOrderChange}
        >
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </div>
    </div>
  );
}
