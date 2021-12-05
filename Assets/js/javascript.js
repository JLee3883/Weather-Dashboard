// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var cities = [];

var openWeatherAPIKey = "ed05bf1e6d3bacd9772fb0967a763ef7";
var lat = "";
var lon = "";


fetch("https://api.openweathermap.org/data/2.5/weather?q=portland&appid=ed05bf1e6d3bacd9772fb0967a763ef7")
  .then(function (response) {
    return response.json();
})
//   .then(function (data) {
//     lat =  data.coord.lat;
// 	lon = data.coord.lon;
// 	return lat, lon;
// })
  
 
// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAPIKey);

  




