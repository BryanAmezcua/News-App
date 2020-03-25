import React, { Component } from 'react';
import './App.css';

//Custom Components
import TopBar from '../TopBar/TopBar.js';
import NewsContainer from '../NewsContainer/NewsContainer.js';
import Footer from '../Footer/Footer.js';
import newsAPI from '../../util/newsAPI.js'

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      newsResults: [],
      isLoading: true
    };

  }

  componentDidMount() {
    fetch('http://newsapi.org/v2/top-headlines?country=us&apiKey=819ab61d31a341edb17c9b181786e30d') // get top headlines from USA -- API is attached at the end
      .then(response => response.json())

      .then(jsonResponse => {
        if (jsonResponse) {
            this.setState({
              newsResults: jsonResponse.articles, // store the news artciles inside of the "newsResults" array inside of state
            });
            setTimeout(() => {
              this.setState({
                isLoading: false
              })
            }, 2000)
        }
      })
      
      .catch(error => console.log(error)) // log an error if one is present
  }

  searchNewsAPI = (term) => {
    newsAPI.searchNewsAPI(term).then(articles => {
      this.setState({
        newsResults: articles // store the API results inside of state to trigger a re-rendering of the news Cards and show news based on the search term
      });
    })
  }

  render() {
    return (

      <div>

        <TopBar 
          onSearch={ this.searchNewsAPI }
        />
        <NewsContainer 
          newsResults={ this.state.newsResults }
          isLoading={ this.state.isLoading }
        />

      </div>

    );
  }

}




export default App;