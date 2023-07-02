"use client";

import { useEffect, useState, useRef } from "react";
import { useTouchscreenDetection } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import RowInput from "./RowInput";

interface PropertyAddProps {
  setPropertyUrls: (urls: string[]) => void;
}

export default function PropertyAdd({ setPropertyUrls }: PropertyAddProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isTouchscreen = useTouchscreenDetection();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("paste", (e) => {
      if (modalOpen) return;
      const clipboardData = e.clipboardData;
      console.log(clipboardData, "clipboardData");
      if (!clipboardData) return;
      const pastedData = clipboardData.getData("Text");
      console.log(pastedData, "pastedData");
      const urls = pastedData.split(",");
      console.log(urls, "urls");
      // setPropertyUrls(urls);
    });
    document.addEventListener("keydown", (e) => {
      if (modalOpen && e.key === "Escape") {
        setModalOpen(false);
      }
    });
    document.addEventListener("mousedown", (e) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setModalOpen(false);
      }
    });

    return () => {
      document.removeEventListener("paste", () => {});
      document.removeEventListener("keydown", () => {});
      document.removeEventListener("mousedown", () => {});
    };
  }, [modalOpen, modalRef]);

  return (
    <>
      <div className={`modal ${modalOpen && "modal-open"}`}>
        <div className="modal-box" ref={modalRef}>
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
            <button
              className="btn"
              onClick={() => setModalOpen(false)}
            >
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

      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-xl bold">To add properties:</h2>
        {!isTouchscreen ? (
          <div className="flex items-center text-lg w-fit relative">
            <kbd className="kbd w-16">CTRL</kbd>&nbsp;+&nbsp;
            <kbd className="kbd w-16">V</kbd>
            <div
              className="mb-auto ml-2 tooltip tooltip-right absolute -right-6 top-0"
              data-tip="Expects a CSV (comma separated list) of Rightmove URLs"
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center text-lg w-fit relative">
              <button className="btn">Paste</button>
              <div
                className="mb-auto ml-2 tooltip tooltip-bottom absolute -right-6 top-0"
                data-tip="Expects a CSV (comma separated list) of Rightmove URLs"
              >
                <FontAwesomeIcon icon={faQuestionCircle} color="" />
              </div>
            </div>
          </div>
        )}
        <span className="text-accent text-lg font-extrabold">OR</span>
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200 text-left"
        >
          <button
            className="btn text-lg font-medium"
            onClick={() => setModalOpen(true)}
          >
            Add Property Links
          </button>
        </div>
      </div>
    </>
  );
}
