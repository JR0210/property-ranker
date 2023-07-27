"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useTouchscreenDetection } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import AddModal from "./AddModal";
import PropertiesContext from "../PropertiesContext";
import { validateUrl } from "@/utils";

export default function PropertyAdd({ loading }: { loading: boolean }) {
  const { setPropertyUrls } = useContext(PropertiesContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const isTouchscreen = useTouchscreenDetection();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function submitPropertyModal(urls: string[]) {
    setPropertyUrls(urls);
    setModalOpen(false);
  }

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const parentEl = modalRef.current?.parentElement;
      if ((parentEl && parentEl.className.includes("modal-open")) || loading)
        return;

      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      const pastedData = clipboardData.getData("Text");
      const items = pastedData.split("\n").filter((item) => item !== "");

      let urls = [];
      let error: string | null = null;
      for (let i = 0; i < items.length; i++) {
        if (!validateUrl(items[i])) {
          error = "Pasted data includes invalid URLs";
          break;
        }
        urls[i] = items[i].trim();
      }

      if (urls.length > 10) error = "Pasted data includes too many URLs";
      if (urls.length === 0) error = "Pasted data includes no URLs";

      if (error) {
        console.log(error, urls);
        return;
      }

      setPropertyUrls(urls);
    }

    document.addEventListener("paste", handlePaste);

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
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", () => {});
      document.removeEventListener("mousedown", () => {});
    };
  }, [modalOpen, modalRef, setPropertyUrls, loading]);

  return (
    <>
      <AddModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        submit={submitPropertyModal}
        ref={modalRef}
      />

      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-xl bold">To add properties:</h2>
        {!isTouchscreen ? (
          <div className="flex items-center text-lg w-fit relative">
            <kbd className="kbd w-16">CTRL</kbd>
            &nbsp;+&nbsp;
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
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
            </div>
          </div>
        )}
        <span className="text-accent text-lg font-extrabold">OR</span>

        <button
          className="btn text-lg font-medium rounded-2xl p-4 h-auto"
          onClick={() => setModalOpen(true)}
          disabled={loading}
        >
          Add Property Links
        </button>
      </div>
    </>
  );
}
