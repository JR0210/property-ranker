export default function AddModal() {
  return (
    <>
      <input type="checkbox" id="property_add_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Add Properties</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
        </div>
        <label className="modal-backdrop" htmlFor="property_add_modal">
          Close
        </label>
      </div>
    </>
  );
}
