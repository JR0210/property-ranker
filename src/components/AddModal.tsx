"use client";

import { forwardRef, useEffect, useState, useContext } from "react";
import RowInput from "./RowInput";
import PropertiesContext from "../PropertiesContext";

interface AddModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  submit: (urls: string[]) => void;
}

interface InputRow {
  value: string;
  touched: boolean;
  valid: boolean;
}

function validateUrl(value: string) {
  try {
    const url = new URL(value);
    console.log(url, "url");
    return url.hostname.includes("rightmove.co.uk");
  } catch (_) {
    return false;
  }
}

export default forwardRef<HTMLDivElement, AddModalProps>(function AddModal(
  { modalOpen, setModalOpen, submit }: AddModalProps,
  ref
) {
  const { propertyUrls, setPropertyUrls } = useContext(PropertiesContext);
  const [inputValues, setInputValues] = useState<InputRow[]>([
    { value: "", touched: false, valid: true },
  ]);

  useEffect(() => {
    if (modalOpen && propertyUrls.length > 0) {
      setInputValues(
        propertyUrls.map((url) => ({ value: url, touched: false, valid: true }))
      );
    }
  }, [modalOpen, propertyUrls]);

  function handleInputChange(val: string, index: number) {
    let newInputValues = [...inputValues];
    newInputValues[index].value = val;
    newInputValues[index].touched = true;
    if (val === "") newInputValues[index].valid = true;
    else newInputValues[index].valid = validateUrl(newInputValues[index].value);
    setInputValues(newInputValues);
  };

  function handleAddRow() {
    setInputValues([...inputValues, { value: "", touched: false, valid: true }]);
  };

  function removeRow(index: number) {
    setInputValues(inputValues.filter((_, i) => i !== index));
  }

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
          {inputValues.map((input, index) => (
            <li className="flex flex-row items-center gap-2" key={index}>
              <RowInput value={input.value} onChange={(val) => handleInputChange(val, index)} valid={input.valid} />
              {inputValues.length > 1 && (
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => removeRow(index)}>✕</button>
              )}
            </li>
          ))}
          <li className="flex flex-row items-center gap-2">
            <button className="btn btn-ghost text-accent" onClick={handleAddRow}>+ Add new row</button>
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
