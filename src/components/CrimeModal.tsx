"use client";

import { forwardRef } from "react";

interface CrimeModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
}

export default forwardRef<HTMLDivElement, CrimeModalProps>(function CrimeModal(
  { modalOpen, setModalOpen, title }: CrimeModalProps,
  ref
) {

  function handleClose() {
    setModalOpen(false);
  }


  return (
    <div className={`modal ${modalOpen && "modal-open"}`}>
      <div className="modal-box" ref={ref}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold">{title} Crime</h3>

        <div className="modal-action">
          <button className="btn btn-accent" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
});
