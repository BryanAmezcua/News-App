import React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

// Custom Components
import profilePhoto from '../../images/profile_page_placeholder_2.png';

//Animation
import Grow from '@material-ui/core/Grow';

// Icons
import AddLocationIcon from '@material-ui/icons/AddLocation';

const useStyles = makeStyles(theme => ({
    main: {
        paddingTop: '1em'
    },
    photo: {
        margin: '0 auto',
        height: '25%',
        width: '25%',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.5
        }
    },
    welcome: {
        color: 'black',
        textAlign: 'center'
    },
    locationIcon: {
        position: 'relative'
    },
    location: {
        paddingTop: '2%',
        margin: '0 auto',
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    // First Name
    let firstName = localStorage.getItem('firstName');
    return (
        <Grow in={true} timeoout={650}>
            <div className={classes.main}>
                
                <img alt="Profile Photo" src={profilePhoto} className={classes.photo}/>

                <Typography variant="h5" className={classes.welcome}>
                    Hello {firstName}
                </Typography>

                <div className={classes.location}>
                    
                    <div className={classes.locationIcon}>
                        <IconButton>
                        <AddLocationIcon />
                        </IconButton>
                    </div>

                    <TextField label="What city are you in?"/>
                </div>

            </div>
        </Grow>
    );
};