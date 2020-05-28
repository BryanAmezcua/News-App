import React, { useState } from 'react';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Animation
import Grow from '@material-ui/core/Grow';

// Custom Components
import AppDrawer from '../AppDrawer/AppDrawer.js';
import { Typography } from '@material-ui/core';



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
      textAlign: 'center',
      fontFamily: '"Helvetica Neue"',
    },
    photo: {
        margin: '0 auto',
        top: '5em',
        height: '30%',
        width: '30%'
    },
}));

export default function ProfileBar(props) {
    const classes = useStyles();
    // Drawer State
    const [isDrawerOpen, setDrawerStatus] = useState(false);

    //let firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={ () => setDrawerStatus(!isDrawerOpen) }>
                    <MenuIcon />
                    <AppDrawer open={isDrawerOpen}/>
                </IconButton>

                <Typography className={classes.title} variant="h4" noWrap>
                    Profile
                </Typography>

                </Toolbar>
            </AppBar>
        </div>
    );
};