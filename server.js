// Empty object to store app data
let weatherDataObj = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

// Running server
const server = app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
})


// App Routes
// Get
app.get('/getData', getData);

function getData(req, res) {
    res.send(weatherDataObj);
}

// Post
app.post('/weather', saveWeatherData);

function saveWeatherData(req, res) {
    weatherDataObj = req.body;
    res.send(weatherDataObj);
}