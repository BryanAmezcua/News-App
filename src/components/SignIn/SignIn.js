import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

//Material-UI Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// Animation
import Grow from '@material-ui/core/Grow';

//Styles
import { makeStyles } from '@material-ui/core/styles';

// This is better than fetch
const axios = require('axios');


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://github.com/BryanAmezcua/News-App/tree/Sign-in-functionality">
        News App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  center: {
    margin: '0 auto'
  }
}));

export default function SignIn(props, ref) {
  let history = useHistory();

  // email state object
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  // email errors state object
  const [emailErrors, setEmailErrors] = useState({
    emailMessage: '',
    emailError: false,
  });
  // password errors state object
  const [passwordErrors, setPasswordErrors] = useState({
    passwordMessage: '',
    passwordError: false
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    // clear error objects before submitting
    setEmailErrors({emailMessage: '', emailError: false});
    setPasswordErrors({passwordMessage: '', passwordError: false});

    let validation = true;
    //let regex = /^([0-9]|[a-z])+([0-9a-z]+)$/i; // TO-DO: validate user's email address to ensure it only contains letters/numbers
    // regex.test(credentials.email)

    if (credentials.email === '') {
      setEmailErrors({emailMessage: 'Field is required', emailError: true});
      validation = false;
    }

    if (credentials.password === '') {
      setPasswordErrors({passwordMessage: 'Field is required', passwordError: true});
      validation = false;
    }

    if (validation === false) return;

    let data = {
      email: credentials.email,
      password: credentials.password,
      action: 'verify'
    };

    axios.post('http://localhost:5000/user_endpoint', data).then(response => {

      if (response.data.passwordCorrect === false) { // entered password is incorrect
        setPasswordErrors({ passwordMessage: response.data.message, passwordError: true});
      } else if (response.data.userExists === false) { // entered email address does NOT exist
        setEmailErrors({emailMessage: response.data.message, emailError: true});
      } else { // user exists & entered the correct password
        setEmailErrors({emailMessage: response.data.message});
        localStorage.setItem('firstName', response.data.firstName);
        setTimeout(function(){
          props.handleLogIn();
          history.push('/home');
        }, 1500)
      }

    })
  };

  const classes = useStyles();

  return (
    <Grow in={true} timeout={650}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={ event => { setCredentials({ ...credentials, email: event.target.value}); }}
              helperText= { emailErrors.emailMessage }
              error = { emailErrors.emailError }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ event => { setCredentials({ ...credentials, password: event.target.value}); }}
              helperText= { passwordErrors.passwordMessage }
              error = { passwordErrors.passwordError }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
              onClick = { handleSubmit }
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item className={ classes.center }>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Grow>
  );
}