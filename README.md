# News-App
News App is an mobile & desktop application that pulls in the latest USA news from newsapi.org. The user can enter search terms and pull up related articles.
Users can create an account, sign in & sign out.

# CORS related issue
When I first began this project there were no cross-origin related issue. However recently, when hitting the news API for data, my fetch request was failing because of a missing header in the response. To get around this I am first sending my request through this URL - which allows CORS anywhere -> https://cors-anywhere.herokuapp.com/

# Installation (using Git)
1.) To begin installation, begin by cloning this repo to your machine -> git clone https://github.com/BryanAmezcua/News-App.git <br />
2.) Wherever you cloned the repo, go there and change directory into "News-App" (cd News-App). <br />
3.) Inside of a code editor (I prefer VSCode), open the "News-App" folder. <br />
4.) Open a new terminal window. Type "npm install" to install the node_moduldes dependencies. <br />
5.) Once the node_modules folder has been installed, within the same terminal type "npm start" to run the app. <br />

# Usage
1.) To use, please begin by creating an account. After your account has been created you will be redirected to a login screen. <br />
2.) Login - you will then be forwarded to the home page. <br />

# Technologies
1.) create-react-app <br />
2.) Material-UI <br />
3.) Express <br />
4.) MongoDB <br />

# ** To-Do's **
1.) Build Profile Page <br />
2.) When clearing localStorage, update to only clear the data I am using and not the entire localStorage <br />
3.) Article filters (finance, pandemic, world news, entertainment, sports) <br />

## License
[MIT](https://choosealicense.com/licenses/mit/)

# Last updated
5/22/20 11:30 AM -- Bryan A.