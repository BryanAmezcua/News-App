let api_key = '819ab61d31a341edb17c9b181786e30d';


// this is currently NOT working
let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1);
let dayOfMonth = date.getDate(); 




const newsAPI = {


    searchNewsAPI(term) {
        
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