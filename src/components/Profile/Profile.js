import React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Custom Components
import profilePhoto from '../../images/profile_page_placeholder_2.png';

//Animation
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(theme => ({
    photo: {
        margin: '0 auto',
        height: '30%',
        width: '30%'
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    // First Name
    let firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    return (
        <Grow in={true} timeoout={650}>
            <React.Fragment>
                <Typography variant="h5">
                    Hello {firstName}
                </Typography>
                <img alt="Profile Photo" src={profilePhoto} className={classes.photo}/>
            </React.Fragment>
        </Grow>
    );
};