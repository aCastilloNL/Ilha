import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '50ch',
  },
}));

export default function TeacherList() {
  const [users, setUsers] = useState(null);
  const classes = useStyles();
  const userId = useSelector((state) => state.authentication.userId);

  const getUsers = () => {
    axios.get('/users?role=teacher').then((users) => {
      setUsers(users.data);
    });
  };

  const chooseTeacher = (id) => {
    axios.put(`/users/${id}/students/${userId}`)
    .then((user) => {
      console.log(user);
      alert('Succesfully connected to your teacher!')
    });
  };

  useEffect(getUsers, []);

  const UserListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 30%;
    height: auto;
    position: absolute;
    left: 35%;
    border: 1px solid white;
    border-radius: 15px;
  `;

  return (
    <div className="test">
      <h1 style={{ textAlign: 'center', marginTop: '0', padding: '2%' }}>
        Choose a teacher
      </h1>
      <UserListContainer>
        <List className={classes.root}>
          {users &&
            users.map((user) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid white',
                    }}
                  >
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${user.firstname} ${user.lastname}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      chooseTeacher(user._id);
                    }}
                  >
                    <PersonAddIcon style={{ width: '3vw', height: '3vw' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </UserListContainer>
    </div>
  );
}
