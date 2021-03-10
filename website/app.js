//const { request } = require("express");

/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='a8a8a7f0f58e508352c6ba7878555297';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log('Date: ' + newDate);

//set a click listener on the form's submit button
document.getElementById('generate').addEventListener('click', performAction);

//This function makes a chained request to GET the weather data and save
//the data using a POST request and finally updating the respective UI elements.
function performAction(e){
    const zip_code =  document.getElementById('zip').value;
    const user_response_data = document.getElementById('feelings').value;
    console.log('Zip: ' + zip_code);
    console.log('User input data: ' + user_response_data);
  
    const data = getWeatherData(baseURL, zip_code, apiKey)
    // New Syntax!
    .then(function(data){
      // Add data
      console.log(data);
      console.log('Temperature: ' + data.main.temp);
      const weather_data_response = postWeatherData('http://localhost:8000' + '/post_data', {temperature: data.main.temp, date: newDate, user_response: user_response_data});
      console.log('Response from POST request: ' + JSON.stringify(weather_data_response));
    })
    .then(
      updateUI('http://localhost:8000' + '/get_data')
    )
  }

  //client-side get weather data request
  const getWeatherData = async (baseURL, zip_code, apiKey) => {
      const response = await fetch(baseURL + zip_code + "&appid=" + apiKey);
      try{
          const weather_data = await response.json();
          console.log('Retrieved weather data: ' + weather_data); 
          return weather_data;
        }catch(error){
            console.log("error", error);
        }
    }
  

  //client-side post weather data request
  const postWeatherData = async (url, data) => {
    console.log('URL: ' + url);
    console.log('Data: ' + JSON.stringify(data));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),       
    });
    if (!response.ok) throw Error(response.message);
    if (response.ok) {
      console.log("POST request success")
    }
    
    try{
      const new_weather_data = await response.json();
      console.log('POST weather data response body: ' + new_weather_data);
      return new_weather_data; 
    }catch(error){
      console.log("error", error);
    }
  }  

  const updateUI = async (url) => {
    const request = await fetch(url);
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temperature;
      document.getElementById('content').innerHTML = allData[0].user_response;
    }catch(error){
      console.log("error", error);
    }
  }