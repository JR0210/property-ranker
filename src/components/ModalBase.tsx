"use client";

import { forwardRef } from "react";

interface ModalBaseProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  submit?: () => void;
  submitDisabled?: boolean;
  title: string;
  children: React.ReactNode;
}

export default forwardRef<HTMLDivElement, ModalBaseProps>(function ModalBase(
  {
    modalOpen,
    setModalOpen,
    title,
    submit,
    submitDisabled,
    children,
  }: ModalBaseProps,
  ref
) {
  const submitExists = typeof submit !== "undefined";

  function handleClose() {
    setModalOpen(false);
  }

  function handleSubmit() {
    if (submitExists) submit();
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
        <h3 className="text-xl font-bold">{title}</h3>

        {children}

        <div className="modal-action">
          <button
            className={`btn ${!submitExists && "btn-accent"}`}
            onClick={handleClose}
          >
            Close
          </button>
          {submitExists && (
            <button
              className="btn btn-accent"
              disabled={submitDisabled}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
