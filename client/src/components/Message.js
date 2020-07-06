import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Message = (props) => {
  return (
    <Snackbar open={props.open}>
      <Alert severity={props.type}>{props.message}</Alert>
    </Snackbar>
  );
};

export default Message;
