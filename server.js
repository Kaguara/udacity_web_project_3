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
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, runServer);

//function that executes when the server is run
function runServer(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`)
}

//application routes
app.get('/get_data', getProjectData);

//function to retrieve the projectData object
function getProjectData(request, response){
    console.log('GET project data response data: ' + projectData);
    response.send(projectData);
}

app.post('/post_data', postProjectData);

//function that adds the projectData to the route object (saves the data)
function postProjectData(request, response){
    console.log('Hello from postProjectData function')
    const new_data = {
        temperature: request.body.temperature,
        date: request.body.date,
        user_response: request.body.user_response
    }
    console.log('New data being saved: ' + new_data);
    projectData.push(new_data);
}