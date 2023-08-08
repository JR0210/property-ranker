"use client";

import { useState, useRef, useContext } from "react";
import CrimeModal from "./CrimeModal";
import PropertiesContext from "@/utils/PropertiesContext";
import useTouchscreenDetection from "@/utils/useTouchscreenDetection";

export default function CardModalWrapper() {
  const { setPropertyUrls } = useContext(PropertiesContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const isTouchscreen = useTouchscreenDetection();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <CrimeModal
      title={"Crime"}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
    />
  );
}
