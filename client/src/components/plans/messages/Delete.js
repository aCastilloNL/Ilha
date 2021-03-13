import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deletePlan } from '../../../redux/actions/PlansActions';
import { useDispatch } from 'react-redux';



export default function Delete( {planId} ) {
  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const executeReduxAction = useDispatch();

  const handleClose = () => {
    setOpen(false);

    executeReduxAction(deletePlan(planId));
  };



  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your plan?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           All the tasks will be deleted. Delete anyway?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
