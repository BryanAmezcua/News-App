import React, { useState, useEffect } from 'react';
import './App.css';

//Custom Components
import TopBar from '../TopBar/TopBar.js';
import NewsContainer from '../NewsContainer/NewsContainer.js';
import SignIn from '../SignIn/SignIn.js';
import newsAPI from '../../util/newsAPI.js'
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import ProfileBar from '../ProfileBar/ProfileBar.js';

// React Router
import { Route, Switch, withRouter } from 'react-router-dom';


function App() {

  const [newsResults, setNewResults] = useState([]);
  const [isLoading, setLoader] = useState(true);

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

  // useEffect(() => {

  //   newsAPI.getDefaultNews().then(jsonResponse => {
  //     setNewResults(jsonResponse.articles);
  //       setTimeout(() => {
  //         setLoader(false);
  //       }, 2000)
  //   });

  // }, []);

  return (
    <Switch>

      <Route path="/" exact component={SignIn}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/profile" exact render={props => 
        <div>
          <ProfileBar/>
          <Profile/>
        </div>}/>
      <Route path="/home" exact render={props => 
        <div>
          <TopBar
            firstName={ props.firstName }
            onSearch={ searchNewsAPI }
          />
          <NewsContainer 
            newsResults={ newsResults }
            isLoading={ isLoading }
          />
        </div>}>
      </Route>

    </Switch>
  );
};

export default withRouter(App);