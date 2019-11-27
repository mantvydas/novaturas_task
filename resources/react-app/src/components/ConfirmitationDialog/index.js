import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmitationDialog({
  open = false,
  handleClose,
  action,
  text
}) {

  return (

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure about it?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={action} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  );
}

ConfirmitationDialog.propTypes = {
  action: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
};

export default ConfirmitationDialog;
