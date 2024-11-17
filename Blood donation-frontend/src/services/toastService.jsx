import { useState, useEffect } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showToast = (message, severity = "info") => {
    localStorage.setItem("toastMessage", message);
    localStorage.setItem("toastSeverity", severity);
    setToast({ open: true, message, severity });
  };
  
  const hideToast = () => {
    localStorage.removeItem("toastMessage");
    localStorage.removeItem("toastSeverity");
    setToast({ open: false, message: "", severity: "info" });
  };
  
  // On page load or component mount, check if there is a stored toast
  useEffect(() => {
    const storedMessage = localStorage.getItem("toastMessage");
    const storedSeverity = localStorage.getItem("toastSeverity");
  
    if (storedMessage) {
      setToast({ open: true, message: storedMessage, severity: storedSeverity });
    }
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
