"use client";

import { useEffect, useState, useRef } from "react";
import { useTouchscreenDetection } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import AddModal from "./AddModal";

interface PropertyAddProps {
  setPropertyUrls: (urls: string[]) => void;
}

export default function PropertyAdd({ setPropertyUrls }: PropertyAddProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isTouchscreen = useTouchscreenDetection();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function submitPropertyModal(urls: string[]) {
    setPropertyUrls(urls);
    setModalOpen(false);
  }

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
      <AddModal modalOpen={modalOpen} setModalOpen={setModalOpen} submit={submitPropertyModal} ref={modalRef} />
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
