"use client";

import { forwardRef, useContext, useMemo, useState } from "react";
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
  streetName: string;
}

export default forwardRef<HTMLDivElement, CrimeModalProps>(function CrimeModal(
  { modalOpen, setModalOpen, title, data = [], streetName }: CrimeModalProps,
  ref
) {
  const [filter, setFilter] = useState<string>("");
  const { crimeTypes } = useContext(PropertiesContext);

  function handleClose() {
    setModalOpen(false);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const filteredData = useMemo(() => {
    if (filter === "" || filter.length < 3) return data;
    return data.filter((a) =>
      a.location?.street?.name
        ?.toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())
    );
  }, [data, filter]);

  return (
    <ModalBase
      title={title}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      cancel={handleClose}
      styling="w-3/5 max-w-5xl h-3/5 max-h-5xl"
      ref={ref}
    >
      <div className="flex flex-col py-4 gap-4 min-h-0">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold">
            Crimes on property road:{" "}
            {
              data.filter((c) => c.location.street.name.includes(streetName))
                .length
            }
          </h3>
          <input
            type="text"
            placeholder="Filter by location"
            className="input input-bordered input-accent"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="overflow-x-auto max-h-full overflow-y-auto">
          <table className="table table-zebra table-md">
            <thead className="text-neutral dark:text-neutral-content text-base sticky top-0 bg-base-300 bg-opacity-62 z-10">
              <tr>
                <th className="rounded-tl-xl">Year/Month</th>
                <th>Crime</th>
                <th className="rounded-tr-xl">Location</th>
              </tr>
            </thead>

            <tbody>
              {filteredData
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
      </div>
    </ModalBase>
  );
});
