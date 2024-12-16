import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";

/* Allow the toast to accept optional actions (like buttons for retry, dismiss, etc.).*/

const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
    actions: null, // Optional actions
  });

  const showToast = (message, severity, actions = null) => {
    setToast({ open: true, message, severity, actions });
  };

  const SnackbarToast = () => (
    <Snackbar
      open={toast.open}
      autoHideDuration={6000}
      onClose={() => setToast({ ...toast, open: false })}
      anchorOrigin={{
        vertical: 'bottom', 
        horizontal: 'center', 
      }}
    >
      <Alert
        onClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
        sx={{ width: "100%" }}
        action={
          // Render optional actions if provided
          toast.actions &&
          toast.actions.map((action, index) => (
            <Button
              key={index}
              color="inherit"
              size="small"
              onClick={action.onClick}
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

