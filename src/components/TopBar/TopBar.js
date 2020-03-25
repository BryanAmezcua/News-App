import React from 'react';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
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
  },
}));



/* START -- Handle the entering of search terms */
//////////////////////////////////////////////////

let handleTermInput = () => {
  let term = document.querySelector('#inputField').value;
  return term;
}


//////////////////////////////////////////////////
/* END -- Handle the entering of search terms */

export default function SearchAppBar(props) {

  const classes = useStyles();


  return (
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>

                  <Typography className={classes.title} variant="h6" noWrap>
                      News
                  </Typography>

                  <div className={classes.search}>

                      <div className={classes.searchIcon}>
                          <SearchIcon/>
                      </div>

                      <InputBase
                        placeholder="Search..."
                        classes={{
                            root: classes.root,
                            input: classes.inputInput
                        }}
                        id='inputField'
                        inputProps={{ 'aria-label': 'search' }}
                      />
                      
                  </div>

                  <Button variant="contained" color="secondary" onClick={() => { props.onSearch(handleTermInput()) }} className={classes.searchButton}>GO</Button>

              </Toolbar>
          </AppBar>
      </div>
  );
}