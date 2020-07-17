import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

// Material-UI Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// This is better than fetch
const axios = require('axios');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" target="_blank" href="https://github.com/BryanAmezcua/News-App/">
        News App&copy;
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AlertDialog(props) {
  let history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClose = (props) => {
    setOpen(false);
    setTimeout(function(){
      history.push('/')
    }, 1000);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Thank you ${props.firstName}.`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account has been created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Take me to sign in.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  centerText: {
    margin: '0 auto'
  }
}));

export default function SignUp() {
  const classes = useStyles();

  // Hooks
  const [isLoggedIn, setStatus] = useState(false);
  const [firstName, setFN] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPW] = useState('');
  const [confirmPassword, setCPW] = useState('');

  const [FNerror, setFNerror] = useState({
    error: false,
    message: ''
  });
  
  const [emailError, setEmailError] = useState({
    error: false,
    message: ''
  });

  const [passwordError, setPasswordError] = useState({
    error: false,
    message: ''
  });

  const [cpwError, setCPWerror] = useState({ // confirm password field errors
    error: false,
    message: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    //clear errors before re-submitting form
    setFNerror({ error: false, message: '' });
    setEmailError({ error: false, message: '' });
    setPasswordError({ error: false, message: '' });
    setCPWerror({ error: false, message: '' });


    let validation = true;

    if (firstName === '') {
      setFNerror({ error: true, message: 'First name is required' })
      validation = false;
    }

    if (email === '' || email.indexOf('@') === -1) {
      setEmailError({ error: true, message: 'Email is required' });
      validation = false;
    }

    if (password === '') {
      setPasswordError({ error: true, message: 'Password is required'});
      validation = false
    }

    if (confirmPassword === '') {
      setCPWerror({ error: true, message: 'Confirmed password is required'});
      validation = false;
    } else if (password !== confirmPassword) {
      setPasswordError({ error: true, message: 'Passwords do NOT match'});
      setCPWerror({ error: true, message: 'Passwords do NOT match'});
      validation = false;
    }

    if (validation === false) return;

    let data = {
      email: email,
      password: password,
      firstName: firstName
    };

    axios.post('/user_endpoint', data).then(response => {
      if (response.data.error === true) { // user with that email already exists
        setEmailError({ error: true, message: response.data.message})
      } else { // create new account with email
        setStatus(true);
      }
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoggedIn ? <AlertDialog firstName={firstName}/> : 'Sign Up'}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange= { event => { setFN(event.target.value); }}
                helperText= { FNerror.message }
                error = { FNerror.error }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange= { event => { setEmail(event.target.value); }}
                helperText= { emailError.message }
                error = { emailError.error }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange= { event => { setPW(event.target.value); }}
                helperText= { passwordError.message }
                error = { passwordError.error }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name=" confirm password"
                label=" Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="confirm-password"
                onChange= { event => { setCPW(event.target.value); }}
                helperText= { cpwError.message }
                error = { cpwError.error }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={ handleSubmit }
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item className={classes.centerText}>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}