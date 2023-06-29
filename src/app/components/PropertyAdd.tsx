"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

export default function PropertyAdd() {
  const [propertyUrls, setPropertyUrls] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4 text-center items-center">
      <h2 className="text-2xl bold">To add properties:</h2>
      <div className="flex items-center text-lg w-fit relative">
        <kbd className="kbd">CTRL</kbd>&nbsp;+&nbsp;<kbd className="kbd">V</kbd>
        <div className="mb-auto ml-2 tooltip tooltip-right" data-tip="Expects a CSV (comma separated list) of Rightmove URLs">
          <FontAwesomeIcon icon={faQuestionCircle} className="" />
        </div>
      </div>
      <span className="text-accent text-lg font-extrabold">OR</span>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-200 text-left"
      >
        <div className="collapse-title text-lg font-medium">
          Add Property Links
        </div>
        <div className="collapse-content">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="input input-bordered"
              placeholder="https://www.rightmove.co.uk/properties/108123456"
              onFocus={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
