// dependencies for Express Server
const express = require('express');
const app = express();
const path = require('path');

// results array
let results = [];

// Axios
const axios = require('axios');

// News API info
let api_key = '819ab61d31a341edb17c9b181786e30d';
let URL = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=' + api_key;
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let destination = proxyUrl + URL;

// Port
const port = process.env.PORT || 5000;

// MongoDB module
const {MongoClient} = require('mongodb');
const { json } = require('express');

// URL of database
const url = 'mongodb+srv://dbUser:dbUser@users-usi4l.mongodb.net/test?retryWrites=true&w=majority';

// set up listener, Port 5000
app.listen(port, () => {
    console.log('Server running');
});

// Serve all static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Client side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// for parsing incomig data into application/json
app.use(express.json());


// headers - this is to allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://157.245.168.216:5000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/default_news', (req, res) => {
    res.send(getDefaultNews())
});


app.post('/user_endpoint', (req, res) => {
    console.log('-------------------------------------------------------');
    console.log('Data coming in:')
    console.log(req.body);
    console.log('-------------------------------------------------------');

    if (req.body.action === 'verify') { // user is logging in
        // verifyUserExists(req.body.email) - returns a promise
        verifyUserExists(req.body.email).then(response => {
                if (!response) {
                    res.send({
                        message: 'Please create an account',
                        userExists: false
                    });
                } else {
                    if (response.password !== req.body.password) {
                        res.send({
                            passwordCorrect: false,
                            message: 'Password is incorrect',
                        });
                    } else {
                        res.send({
                            message: `Welcome back ${response.firstName}`,
                            firstName: response.firstName
                        });
                    }
                }
            });
    } else { // user is creating an account
        verifyUserExists(req.body.email).then(response => {
            if (response !== null) { // user with that email already exists
                    res.send({
                        message: 'An account with this email already exists',
                        error: true
                    });
            } else { // response is null - email does NOT exist
                    createUser(req.body.email, req.body.password, req.body.firstName).then(response => {
                        if (response.insertedCount > 0) { // if user account was successfully created
                            console.log('This user was created:')
                            console.log(response.ops);
                            res.send({
                                message: 'Your account has been created. Redirecting to sign in page.',
                                error: false
                            });
                        } else { // user account was NOT created
                            res.send({
                                message: 'Something went wrong..Please try again.',
                                error: true
                            });
                        }
                    });
            }
        })

    }
});

async function getDefaultNews () {

    try {
        await axios.get(destination)
                    .then(response => {
                        console.log(response.body, 'TESTINGTESTING123123');
                        //if (response.data) {
                        //    response.data.json();
                        //}
                    })
                    /*.then(jsonResponse => {
                        console.log(jsonResponse)
                        if (jsonResponse) return jsonResponse;
                    })*/
                    .catch(error => console.log(error));
    } catch (error) {
        console.log(error)
    }
};


async function verifyUserExists (email) {

    // Create a new MongoClient - connect to the databse
    const mongoClient = new MongoClient(url, {useUnifiedTopology: true});

    try {
        await mongoClient.connect();
        const db = mongoClient.db('db1'); // Database name
        const dbCollection = db.collection('users'); // Collection name

        const results = await dbCollection.findOne({'email': email}); // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOne

        return results;
    } 
    catch(error) {
        console.log(error);
    } finally {
        mongoClient.close();
    }
};

async function createUser(email, password, firstName) {

    // Create a new MongoClient - connect to the databse
    const mongoClient = new MongoClient(url, {useUnifiedTopology: true});

    try {

        await mongoClient.connect();
        const db = mongoClient.db('db1'); // Database name
        const dbCollection = db.collection('users'); // Collection name

        const results = await dbCollection.insertOne({email, password, firstName}); // http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne
        return results;

    } catch (error) {
        console.log(error);
    }
    finally {
        mongoClient.close();
    }
};