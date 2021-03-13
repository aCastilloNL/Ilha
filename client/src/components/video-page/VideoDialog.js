import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const videoDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List>
        <ListItem
          button
          onClick={() => handleListItemClick('New')}
          key={'Create videoroom'}
        >
          <ListItemText primary={'Create new videoroom'} />
        </ListItem>
        <ListItem
          button
          onClick={() => handleListItemClick('Existing')}
          key={'Connect to videoroom'}
        >
          <ListItemText primary={'Connect to existing videoroom'} />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default videoDialog;
