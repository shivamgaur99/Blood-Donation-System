import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

import "./toast.css"; 

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * @param {open} props (boolean): open/close state of the Toast message
 * @param {severity} props (string): 4 possible values: info, success, warning, error
 * @param {message} props (string): Toast message
 * @param {handleCloseToast} props (function): closes the toast
 */
const useStyles = makeStyles((theme) => ({
  root: {
    "& button": {
      outline: "none",
    },
  },
}));

export function SimpleToast(props) {
  const classes = useStyles();

  return (
    <div className={`${"root"} ${classes.root}`}>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} 
      >
        <div>
          <Alert
            severity={props.severity || "info"}
            onClose={props.handleCloseToast}
          >
            {props.message}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
}
