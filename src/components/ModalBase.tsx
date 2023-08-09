"use client";

import { forwardRef } from "react";

interface ModalBaseProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
  submit?: () => void;
  submitDisabled?: boolean;
  cancel?: () => void;
  submitText?: string;
  cancelText?: string;
  children: React.ReactNode;
  styling?: string;
}

export default forwardRef<HTMLDivElement, ModalBaseProps>(function ModalBase(
  {
    modalOpen,
    setModalOpen,
    title,
    submit,
    cancel,
    submitDisabled,
    submitText = "Submit",
    cancelText = "Cancel",
    children,
    styling,
  }: ModalBaseProps,
  ref
) {
  const submitExists = typeof submit !== "undefined";

  function handleClose() {
    cancel!();
    setModalOpen(false);
  }

  function handleSubmit() {
    submit!();
    setModalOpen(false);
  }

  return (
    <div className={`modal ${modalOpen && "modal-open"}`}>
      <div className={`modal-box flex flex-col ${styling}`} ref={ref}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold">{title}</h3>

        {children}

        <div className="modal-action mt-auto">
          <button
            className={`btn ${!submitExists && "btn-accent"}`}
            onClick={handleClose}
          >
            {cancelText}
          </button>
          {submitExists && (
            <button
              className="btn btn-accent"
              disabled={submitDisabled}
              onClick={handleSubmit}
            >
              {submitText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
