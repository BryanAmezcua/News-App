import React from 'react';

// Material UI Components
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';


// Styles
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: '#d2d1d1',
        padding: '2em',
        marginTop: '1em',
        width: '100%'
    }
}))


function Copyright() {
    return (

        <React.Fragment>

            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}

                <Link color="inherit" href="#">
                    BA News
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>

        </React.Fragment>

    );
}



function Footer() {

    const classes = useStyles();

    
    return (
        <footer className={classes.footer}>

            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                News &amp; Weather
            </Typography>

            <Copyright/>

        </footer>
    );

}
export default Footer;