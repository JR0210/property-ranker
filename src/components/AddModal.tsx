import { forwardRef } from "react";
import RowInput from "./RowInput";

interface AddModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  submit: (urls: string[]) => void;
}

export default forwardRef<HTMLDivElement, AddModalProps>(function AddModal(
  { modalOpen, setModalOpen, submit }: AddModalProps,
  ref
) {
  return (
    <div className={`modal ${modalOpen && "modal-open"}`}>
      <div className="modal-box" ref={ref}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setModalOpen(false)}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold">Add Properties</h3>
        <ul className="flex flex-col w-full py-4 px-2 gap-4">
          <li className="flex flex-row items-center gap-2">
            <RowInput />
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </li>
          <li className="flex flex-row items-center gap-2">
            <button className="btn btn-ghost text-accent">+ Add new row</button>
          </li>
        </ul>
        <div className="modal-action">
          <button className="btn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className="btn btn-accent"
            onClick={() => setModalOpen(false)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
});
