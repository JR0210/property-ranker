"use client";

import { useState } from "react";
import { useTouchscreenDetection } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export default function PropertyAdd() {
  const isTouchscreen = useTouchscreenDetection();
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  return (
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
        <label htmlFor="property_add_modal" className="btn text-lg font-medium">
          Add Property Links
        </label>
      </div>
    </div>
  );
}
