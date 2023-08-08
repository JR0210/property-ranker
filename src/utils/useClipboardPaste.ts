import { useEffect } from "react";

function useClipboardPaste(
  callback: (clipboardData: DataTransfer | null) => void
) {
  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      callback(e.clipboardData);
    }

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [callback]);
}

export default useClipboardPaste;
