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

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//Custom Drawer CSS
const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
  }));

export default function AppDrawer(props) {
    const classes = useStyles();
    let dynamic_link, dynamic_text = '';

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
                <List component="nav">
                    <Link to={dynamic_link} className={classes.link}>
                        <ListItem button divider={true}>
                            <ListItemIcon>
                            <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={dynamic_text}/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};