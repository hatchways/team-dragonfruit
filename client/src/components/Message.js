import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Message = (props) => {
  const [isOpen, setIsOpen] = useState(props.open);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Message;
