import React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';

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
    return (
        <Grow in={true} timeoout={650}>
            <div>
                <h1>testing</h1>
                <img alt="Profile Photo" src={profilePhoto} className={classes.photo}/>
            </div>
        </Grow>
    );
};