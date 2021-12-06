const cities = [];
const apiKey = `ed05bf1e6d3bacd9772fb0967a763ef7`
const cityInputEl=document.querySelector("#city")
const citySubmitEl=document.querySelector("#city-submit");
const weatherContainerEl=document.querySelector("#current-weather-container");
const forecastContainerEl = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");

//Taking in user input and saving search
const formSumbitHandler = function(event){
  event.preventDefault();
  let city = cityInputEl.value.trim();
  if(city){
      getWeather(city);
      get5Day(city);
      cities.unshift({city});
      cityInputEl.value = "";
  } else{
      alert("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
}

const saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

const getWeather = function(city){//
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  fetch(api)
  .then(function(response){
      response.json()
  .then(function(data){
          displayWeather(data, city);
      });
  });
};

const displayWeather = function(weather, searchCity){//
  //clear old content
  weatherContainerEl.textContent= "";  //
  citySearchInputEl.textContent=searchCity;//

  //Date with moment
  let currentDate = document.createElement("span")//
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";//
  citySearchInputEl.appendChild(currentDate);//

  //Icon images
  let weatherIcon = document.createElement("img")//
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);//
  citySearchInputEl.appendChild(weatherIcon);//

  //Temp data
  let temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item"

  //Humidity data
  let humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item"

  //Wind data
  let windEl = document.createElement("span");
  windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windEl.classList = "list-group-item"

  //Appending all to the containers
  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windEl);

  let lat = weather.coord.lat;
  let lon = weather.coord.lon;
  getUvIndex(lat,lon)
}

//fetching the UV
const getUvIndex = function(lat,lon){
  let apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

  fetch(apiURL)
  .then(function(response){
      response.json()
  .then(function(data){
          displayUvIndex(data)
      });
  });
}

//Display for the UV and attaching the classes of color for weather conditions
const displayUvIndex = function(index){
  let uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList = "list-group-item"

  uvIndexValue = document.createElement("span")
  uvIndexValue.textContent = index.value

  if(index.value <=2){
      uvIndexValue.classList = "favorable"
  }else if(index.value >2 && index.value<=8){
      uvIndexValue.classList = "moderate "
  }
  else if(index.value >8){
      uvIndexValue.classList = "severe"
  };

  uvIndexEl.appendChild(uvIndexValue);
  weatherContainerEl.appendChild(uvIndexEl);
}

//Fetching the 5 day forecast
const get5Day = function(city){
  let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

  fetch(api)
  .then(function(response){
      response.json()
  .then(function(data){
         display5Day(data);
      });
  });
};


//Displaying the 5 day forecast
const display5Day = function(weather){
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5 Day Forecast:";

  let forecast = weather.list;
      for(var i=5; i < forecast.length; i=i+8){
     let dailyForecast = forecast[i];
      
     
     let forecastEl=document.createElement("div");
     forecastEl.classList = "card bg-primary text-light m-2";

     let forecastDate = document.createElement("h5")
     forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
     forecastDate.classList = "card-header text-center"
     forecastEl.appendChild(forecastDate);

     let weatherIcon = document.createElement("img")
     weatherIcon.classList = "card-body text-center";
     weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

     forecastEl.appendChild(weatherIcon);
     
     let forecastTempEl=document.createElement("span");
     forecastTempEl.classList = "card-body text-center";
     forecastTempEl.textContent = dailyForecast.main.temp + " °F";

      forecastEl.appendChild(forecastTempEl);

     let forecastHumEl=document.createElement("span");
     forecastHumEl.classList = "card-body text-center";
     forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

      forecastEl.appendChild(forecastHumEl);

      forecastContainerEl.appendChild(forecastEl);
  }

}

const pastSearch = function(pastSearch){

  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city",pastSearch);
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
}

const pastSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

citySubmitEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);