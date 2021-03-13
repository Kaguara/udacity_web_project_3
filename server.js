// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, runServer);

//function that executes when the server is run
function runServer(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

//application routes
app.get('/get_data', getProjectData);
app.post('/post_data', postProjectData);

//function to retrieve the projectData object
function getProjectData(req, res){
    res.send(projectData);
}

//function that adds the projectData to the route object (saves the data)
function postProjectData(req, res){
    const new_data = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    };
    projectData = new_data;
    res.send(projectData);
}