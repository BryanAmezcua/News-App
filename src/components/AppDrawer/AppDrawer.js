import React, { useState } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Material-UI Components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

//Custom Drawer CSS
const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    welcome: {
        textAlign: 'center',
        padding: theme.spacing(1, 1.2),
    },
  }));

export default function AppDrawer(props) {
    const classes = useStyles();
    let dynamic_link, dynamic_text = '';
    let firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (window.location.href.indexOf('/profile') !== -1) {
        dynamic_link = '/home';
        dynamic_text = 'Home';
    } else {
        dynamic_link = '/profile';
        dynamic_text = 'My Profile';
    }

    return (
        <div>
            <Drawer
                open={props.open}
                transitionDuration={450}
            >
                <Typography variant="h6" className={classes.welcome}>
                    Hello {firstName}
                </Typography>

                <Divider />

                <List component="nav">
                    <Link to={dynamic_link} className={classes.link}>
                        <ListItem button divider={true}>
                            <ListItemIcon>
                            <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={dynamic_text}/>
                        </ListItem>
                    </Link>
                    <Link to="/" className={classes.link}>
                        <ListItem button onClick={() => localStorage.clear()} divider={true}>
                            <ListItemIcon>
                            <LockIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Log Out"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};