import React, { useState, useEffect } from 'react';
import './App.css';

//Custom Components
import TopBar from '../TopBar/TopBar.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import NewsContainer from '../NewsContainer/NewsContainer.js';
import SignIn from '../SignIn/SignIn.js';
import newsAPI from '../../util/newsAPI.js'
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import ProfileBar from '../ProfileBar/ProfileBar.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
// React Router
import { Route, Switch, withRouter } from 'react-router-dom';


function App() {

  const [newsResults, setNewResults] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [loggedIn, setStatus] = useState(false);

  const log_in_or_out = () => {
    setStatus(!loggedIn);
    localStorage.setItem('loggedIn', !loggedIn);
  }

  const searchNewsAPI = (term) => {
    if (term === '') {
      return;
    } else {
      setLoader(true);
      newsAPI.searchNewsAPI(term).then(articles => {
        setNewResults(articles);
        setLoader(false);
      });
    }
  }

  useEffect(() => {

    newsAPI.getDefaultNews().then(jsonResponse => {
      setNewResults(jsonResponse.articles);
      setTimeout(() => {
        setLoader(false);
      }, 2000)
    });

  }, []);

  return (
    <Switch>

      <Route exact path="/" render={props => <SignIn {...props} handleLogIn={log_in_or_out}/>}/>
      <Route exact path="/register" component={Register}/>
      <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
        <div>
          <ProfileBar/>
          <Profile/>
        </div>
      </ProtectedRoute>
      <ProtectedRoute exact path="/home" loggedIn={loggedIn}>
        <div>
          <TopBar
            onSearch={ searchNewsAPI }
          />
          <NewsContainer 
            newsResults={ newsResults }
            isLoading={ isLoading }
          />
        </div>
      </ProtectedRoute>
      <Route render={props => <ErrorPage {...props} loggedIn={loggedIn}/>}/>

    </Switch>
  );
};

export default withRouter(App);