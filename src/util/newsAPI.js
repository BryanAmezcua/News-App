let api_key = '819ab61d31a341edb17c9b181786e30d';
let URL = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=' + api_key;
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let destination = proxyUrl + URL;




const newsAPI = {

    async getDefaultNews() { // get top headlines from USA -- API is attached at the end

        return fetch(destination)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse) return jsonResponse
            })

        .catch(error => console.log(error)) // log an error if one is present
    },


    async searchNewsAPI(term) {

        // set the vars
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let dayOfMonth = date.getDate(); 
        
        try {

            let url = 'http://newsapi.org/v2/everything?q=' + term + '&from=' + year + '-' + month + '-' + dayOfMonth + '&apiKey=' + api_key;
            
            return fetch(url)
                .then(response => response.json())
                .then(jsonResponse => {
                    return jsonResponse.articles;
                }).catch(error => console.log(error))

        } catch(error) {
            console.log(error);
        }
    }


};

export default newsAPI;