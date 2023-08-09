import { useEffect } from "react";

function useCloseModal(
  modalOpen: boolean,
  modalRef: React.RefObject<HTMLElement>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (modalOpen && e.key === "Escape") {
        setModalOpen(false);
      }
    }

    function handleMouseDown(e: MouseEvent) {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [modalOpen, modalRef, setModalOpen]);
}

export default useCloseModal;
