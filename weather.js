const express = require("express");
const axions = require("axios");
require("dotenv").config();
const weather = express();
const API_KEY = process.env.API_KEY;

const port = 9000;
weather.get("/", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send("Please provide an address.");
  }
  
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}`;
  axions.get(url).then((response) => {
    const weatherData = response.data;
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp-273.15;
    const currentDate = new Date().toLocaleDateString();
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
    const message = `City Name: ${cityName}, <br> Temperature: ${temperature}&deg;C, <br> Day: ${currentDate}, <br> Sunset Time: ${sunsetTime}`;
    res.send(`<h1>${message}<h1>`);
  });

});

weather.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
