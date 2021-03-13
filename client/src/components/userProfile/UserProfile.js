import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import EventIcon from '@material-ui/icons/Event';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Button from '@material-ui/core/Button';
import logo from '../images/logo_White_NT.png';
import UserAvatar from 'react-user-avatar';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badges from '../badges/Badges';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';

import '../dashboard/Dashboard.css';

const { signOut } = require('../../redux/actions/AuthActionCreators.js');

const drawerWidth = 185;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgb(39, 25, 90)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  selectedMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userProfile: {
    marginTop: -30,
    marginBottom: -5,
  },
  userName: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 14,
    paddingBottom: 13,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
    ].join(','),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: 'rgb(255, 255, 255)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: 'rgb(255, 255, 255)',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },

  button: {
    backgroundColor: 'rgb(255, 255, 255)',
    marginLeft: '85%',
    position: 'absolute',
    top: '20%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  messageButton: {
    margin: theme.spacing(1),
    color: blue,
  },
  userProHeader: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
  },
  headerName: {
    paddingTop: 15,
    paddingLeft: 30,
    fontSize: 16,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
}));

function HomeIcon(props) {
  return <MenuIcon />;
}

export default function UserProfile() {
  const classes = useStyles();
  const theme = useTheme();
  const userName = useSelector((state) => state.authentication.username);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(true);

  const handleSignOut = () => {
    dispatch(signOut(history));
  };

  ///////////////////// make drawer close when screen is small
  const setSmall = () => {
    setOpen(false);
  };

  const setLarge = () => {
    setOpen(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    mediaQuery.addListener((mq) => {
      if (mq.matches) {
        setLarge();
      } else {
        setSmall();
      }
    });
  });

  const options = [
    <UserAvatar
      size="120"
      name={userName}
      color="#a8a8a8"
      className="user-profile"
    />,
    <Link to="/editProfile" className="menu-link">
      <Button color="secondary">Edit Profile</Button>
    </Link>,
    'Cancel',
  ];

  ////////////////Pop-Out Window for User Avatar
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <div className="logo-container">
              <img src={logo} alt="ilha logo" />
              <p>ILHA</p>
            </div>
          </Typography>
          <Link to="/Video" target="_blank">
            <Button variant="contained" className={classes.button}>
              <VideoCallIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <div className={classes.root}></div>
        <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            onClick={handleClickListItem}
          >
            {open ? (
              <div className={classes.userProfile}>
                <UserAvatar
                  size="120"
                  name={userName}
                  color="#a8a8a8"
                  className="user-profile"
                />
                <Badges />
              </div>
            ) : (
              <ListItemIcon>
                <Avatar
                  alt={userName}
                  src="/static/images/avatar/1.jpg"
                  className="small-avatar"
                  onClick={handleClickListItem}
                />
              </ListItemIcon>
            )}
          </ListItem>
          <div className={classes.userName}>{userName}</div>
          <Divider />
          <Link to="/myProfile" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'My Profile'} />
            </ListItem>
          </Link>

          <Link to="/Dashboard" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </Link>

          <Link to="/Messages" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={'Messages'} />
            </ListItem>
          </Link>

          <Link to="/agenda" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'Agenda'} />
            </ListItem>
          </Link>

          <Link to="/users" target="_blank" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <VideoCallIcon />
              </ListItemIcon>
              <ListItemText primary={'Connect'} />
            </ListItem>
          </Link>

          <Link to="/files" className="menu-link">
            <ListItem button>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={'Files'} />
            </ListItem>
          </Link>

          <Link to="/" className="menu-link">
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
          </Link>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <div className={classes.selectedMenu}>
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            </div>
          ))}
        </Menu>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.userProHeader}>
                <UserAvatar size="140" name={userName} color="#a8a8a8" />
                <div className={classes.headerName}>{userName}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>About</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>Interests</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>Badges</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>Instruments</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>Languages</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>Links</Paper>
            </Grid>
          </Grid>
        </div>
        {/* <Analytics2 />
        <Plans /> */}
      </main>
    </div>
  );
}
