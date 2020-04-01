import React, { useState, useEffect } from 'react';
import './App.css';

//Custom Components
import TopBar from '../TopBar/TopBar.js';
import NewsContainer from '../NewsContainer/NewsContainer.js';
import Footer from '../Footer/Footer.js';
import newsAPI from '../../util/newsAPI.js'


export default function App() {

  const [newsResults, setNewResults] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const searchNewsAPI = (term) => {
    newsAPI.searchNewsAPI(term).then(articles => {
      setNewResults(articles);
    })
  }

  useEffect(() => {

    newsAPI.getDefaultNews().then(jsonResponse => {
      setNewResults(jsonResponse.articles);
        setTimeout(() => {
          setLoader(false);
        }, 2000)
    })

  }, [isLoading]);

  return (
    <div>

        <TopBar 
          onSearch={ searchNewsAPI }
        />
        <NewsContainer 
          newsResults={ newsResults }
          isLoading={ isLoading }
        />

      </div>
  );
}