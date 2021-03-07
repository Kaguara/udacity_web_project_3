//const { request } = require("express");

/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='a8a8a7f0f58e508352c6ba7878555297';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//set a click listener on the form's submit button
document.getElementById('generate').addEventListener('click', performAction);

//This function makes a chained request to GET the weather data and save
//the data using a POST request and finally updating the respective UI elements.
function performAction(e){
    const zip_code =  document.getElementById('zip').value;
    //ToDo: get user response from Form??
  
    const data = getWeatherData(baseURL, zip_code, apiKey)
    // New Syntax!
    .then(function(data){
      // Add data
      console.log(data);
      postWeatherData('/post_data', {temperature:data.main.temp, date: newDate, user_response:'?'} );
    })
    .then(
      updateUI()
    )
  }

  //client-side get weather data request
  const getWeatherData = async (baseURL, zip_code, apiKey) => {
      const response = await fetch(baseURL + zip_code + "&appid=" + apiKey);
      try{
          const weather_data = await response.json();
          return weather_data;
          console.log('Retrieved weather data: ' + weather_data); 
        }catch(error){
            console.log("error", error);
        }
    }
  

  //client-side post weather data request
  const postWeatherData = async (url = '', data = {}) => {
      const response = await fetch(url, {
          method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),       
      });
      try{
          const new_weather_data = await response.json();
          return new_weather_data;
          console.log('POST weather data request body: ' + new_weather_data); 
        }catch(error){
            console.log("error", error);
        }
    }  
  const updateUI = async () => {
    const request = await fetch('/get_data');
    try{
      const allData = await request.json();
      document.getElementById('animalName').innerHTML = allData[0].animal;
      document.getElementById('animalFact').innerHTML = allData[0].facts;
      document.getElementById('animalFav').innerHTML = allData[0].fav;
  
    }catch(error){
      console.log("error", error);
    }
  }