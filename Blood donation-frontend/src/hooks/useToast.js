import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

/* Allow the toast to accept optional actions (like buttons for retry, dismiss, etc.).*/
const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
    actions: [],
    autoHideDuration: 6000,
  });

  const showToast = (
    message,
    severity = "info",
    actions = [],
    autoHideDuration = 6000
  ) => {
    setToast({ open: true, message, severity, actions, autoHideDuration });
  };

  const SnackbarToast = () => (
    <Snackbar
      open={toast.open}
      autoHideDuration={toast.autoHideDuration}
      onClose={() =>
        setToast({
          open: false,
          message: "",
          severity: "info",
          actions: [],
          autoHideDuration: 6000,
        })
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() =>
          setToast({
            open: false,
            message: "",
            severity: "info",
            actions: [],
            autoHideDuration: 6000,
          })
        }
        severity={toast.severity}
        sx={{ width: "100%" }}
        action={
          toast.actions &&
          toast.actions.map((action, index) => (
            <Button
              key={index}
              color="inherit"
              size="small"
              onClick={() => {
                action.onClick();
                setToast({ ...toast, open: false });
              }}
            >
              {action.label}
            </Button>
          ))
        }
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );

  return { showToast, SnackbarToast };
};

export default useToast;

// const useToast = () => {
//   const [toast, setToast] = useState({ open: false, message: "", severity: "" });

//   const showToast = (message, severity) => {
//     setToast({ open: true, message, severity });
//   };

//   const SnackbarToast  = () => (
//     <Snackbar
//       open={toast.open}
//       autoHideDuration={6000}
//       onClose={() => setToast({ ...toast, open: false })}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'center',
//       }}
//     >
//       <Alert
//         onClose={() => setToast({ ...toast, open: false })}
//         severity={toast.severity}
//         sx={{ width: "100%" }}
//       >
//         {toast.message}
//       </Alert>
//     </Snackbar>
//   );

//   return { showToast, SnackbarToast };
// };
