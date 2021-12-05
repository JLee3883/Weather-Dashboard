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


const openAPIKey = "ed05bf1e6d3bacd9772fb0967a763ef7";
let cities = [];
let cityInputEl=document.querySelector("#city")
const citySubmitEl=document.querySelector("#city-submit");

let formSumbitHandler = function(event){
  event.preventDefault();
  let city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    } saveSearch();
}

const saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

const getWeather = function(city){

  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${openAPIKey}`

  fetch (api)
    .then(function (response) {
      response.json() 
    .then(function(data){
      displayWeather(data, city);
    });
  });
};


const displayWeather = function(weather, searchCity){
  
  weatherContainerEl.textContent= "";  
  citySearchInputEl.textContent=searchCity;
  console.log(weather);

  let currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  let tempEl = document.createElement("span");
  tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
  tempEl.classList = "list-group-item"

  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item"

  let windEl = document.createElement("span");
  windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windEl.classList = "list-group-item"

  weatherContainerEl.appendChild(tempEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windEl);

  let lat = weather.coord.lat;
  let lon = weather.coord.lon;
  getUvIndex(lat,lon)
}

citySubmitEl.addEventListener("submit", formSumbitHandler);
