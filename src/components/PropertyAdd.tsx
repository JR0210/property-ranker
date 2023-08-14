"use client";

import { useState, useRef, useContext } from "react";
import useTouchscreenDetection from "@/utils/useTouchscreenDetection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import AddModal from "./AddModal";
import PropertiesContext from "@/utils/PropertiesContext";
import { handlePasteFormatting } from "@/utils";
import useClipboardPaste from "@/utils/useClipboardPaste";
import useCloseModal from "@/utils/useCloseModal";

export default function PropertyAdd({ loading }: { loading: boolean }) {
  const { setPropertyUrls } = useContext(PropertiesContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const isTouchscreen = useTouchscreenDetection();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function submitPropertyModal(urls: string[]) {
    setPropertyUrls(urls);
    setModalOpen(false);
  }

  function handlePaste(clipboardData: DataTransfer | null) {
    const parentEl = modalRef.current?.parentElement;
    if ((parentEl && parentEl.className.includes("modal-open")) || loading)
      return;

    if (!clipboardData) return;

    const urls = handlePasteFormatting(clipboardData);

    if (!urls) return;

    setPropertyUrls(urls);
  }

  useClipboardPaste(handlePaste);
  useCloseModal(modalOpen, modalRef, setModalOpen);

  return (
    <>
      <AddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        submit={submitPropertyModal}
        ref={modalRef}
      />

      <button className="fixed z-30 btn btn-accent btn-square shadow-lg top-4 left-4 lg:top-8 lg:left-8">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="hidden sm:block sm:text-base md:text-xl bold">
          To add properties:
        </h2>
        {!isTouchscreen ? (
          <div className="flex items-center text-lg w-fit relative">
            <kbd className="kbd w-fit lg:w-16">CTRL</kbd>
            &nbsp;+&nbsp;
            <kbd className="kbd w-fit lg:w-16">V</kbd>
            <div
              className="mb-auto ml-2 tooltip tooltip-bottom lg:tooltip-right absolute -right-6 top-0"
              data-tip="Expects a CSV (comma separated list) of Rightmove URLs"
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center text-sm md:text-lg w-fit relative">
              <button className="btn">Paste</button>
              <div
                className="mb-auto ml-2 tooltip tooltip-bottom lg:tooltip-right absolute -right-6 top-0"
                data-tip="Expects a CSV (comma separated list) of Rightmove URLs"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
            </div>
          </div>
        )}
        <span className="text-accent text-base md:text-lg font-extrabold">
          OR
        </span>

        <button
          className="btn text-sm md:text-lg font-medium rounded-2xl p-4 h-auto"
          onClick={() => setModalOpen(true)}
          disabled={loading}
        >
          Add Property Links
        </button>
      </div>
    </>
  );
}
