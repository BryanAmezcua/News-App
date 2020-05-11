import React, { useState } from 'react';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Components
import AppDrawer from '../AppDrawer/AppDrawer.js';

//Animation
import Grow from '@material-ui/core/Grow';

//Custom TopBar CSS
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0,1,0,0)
  },
  title: {
    flexGrow: 1,
    margin: '0 auto',
    textAlign: 'center'
  },
}));

export default function ProfileBar(props) {
  // CSS classes
  const classes = useStyles();
  // Drawer State
  const [isDrawerOpen, setDrawerStatus] = useState(false);
  let firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  return (
    <Grow in={true} timeout={650}>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={ () => setDrawerStatus(!isDrawerOpen) }>
                    <MenuIcon />
                    <AppDrawer open={isDrawerOpen}/>
                </IconButton>

                <Typography className={classes.title} variant="h4" noWrap>
                    Welcome {firstName}
                </Typography>

                </Toolbar>
            </AppBar>
        </div>
    </Grow>
  );
}