import React, { useState } from 'react';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Components
import AppDrawer from '../AppDrawer/AppDrawer.js';

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
    display: 'none',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      paddingLeft: '15%'
    },
  },
  welcomeText: {
    flexGrow: 1,
    textAlign: 'center',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: '#fff',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  searchButton: {
    marginLeft: `calc(1em + ${theme.spacing(1)}px)`,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
}));

export default function SearchAppBar(props) {
  // CSS classes
  const classes = useStyles();
  // Drawer State
  const [isDrawerOpen, setDrawerStatus] = useState(false);

  const handleTermInput = () => {
    let term = document.querySelector('#inputField').value;
    return term;
  };

  if (props.display === 'none') {
    console.log()
  }

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={ () => setDrawerStatus(!isDrawerOpen) }>
              <MenuIcon />
              <AppDrawer open={isDrawerOpen}/>
            </IconButton>
            
            <Typography className={classes.title} variant="h3" noWrap>
              News
            </Typography>

            <div className={classes.search} id='search'>

              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>

              <InputBase
                placeholder='Search...'
                classes={{
                    root: classes.root,
                    input: classes.inputInput
                }}
                id='inputField'
                inputProps={{ 'aria-label': 'search' }}
              />

                <Typography className={classes.welcomeText} variant="h6" noWrap>
                  Welcome {props.firstName}
                </Typography>
                
            </div>

            <Button
              variant="contained" 
              color="secondary" 
              onClick={() => { props.onSearch(handleTermInput()) }} 
              className={classes.searchButton} 
              id="submitButton">GO
            </Button>

          </Toolbar>
        </AppBar>
      </div>
  );
}