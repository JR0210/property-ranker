"use client";

import { forwardRef, useContext } from "react";
import PropertiesContext from "@/utils/PropertiesContext";
import ModalBase from "./ModalBase";

interface Crime {
  id: number;
  category: string;
  month: string;
  location: {
    street: {
      name: string;
    };
  };
}

interface CrimeModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
  data: Crime[];
}

export default forwardRef<HTMLDivElement, CrimeModalProps>(function CrimeModal(
  { modalOpen, setModalOpen, title, data = [] }: CrimeModalProps,
  ref
) {
  const { crimeTypes } = useContext(PropertiesContext);

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <ModalBase
      title={title}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      cancel={handleClose}
      styling="w-3/5 max-w-5xl"
      ref={ref}
    >
      <div className="overflow-x-auto max-h-[33vh] overflow-y-auto my-4">
        <table className="table table-zebra table-md">
          <thead className="text-neutral-content text-base sticky top-0 bg-base-300 bg-opacity-62 z-10">
            <tr>
              <th className="rounded-tl-xl">Year/Month</th>
              <th>Crime</th>
              <th className="rounded-tr-xl">Location</th>
            </tr>
          </thead>

          <tbody>
            {data
              .sort((a, b) => a.month.localeCompare(b.month))
              .map((crime) => (
                <tr key={crime.id}>
                  <td>{crime.month}</td>
                  <td>{crimeTypes[crime.category]}</td>
                  <td>{crime.location?.street?.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ModalBase>
  );
});
