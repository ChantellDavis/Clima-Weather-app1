function displayTemp(response) {
    console.log(response.data)
    let currentTemp = document.querySelector("#current-Temp");
    let temperature = `${Math.round(response.data.temperature.current)}`;
    let weatherCondition = document.querySelector("#weather-Condition");
    let weatherConditionData = document.querySelector("#weather-Condition-Data");
    let humidityElement = `${Math.round(response.data.temperature.humidity)}%`;
    let weatherConditionDataTwo = document.querySelector("#weather-Condition-Data-Two");
    let windElement = `${Math.round(response.data.wind.speed)} Mph`;
   
    let icon = document.querySelector("#icon");
    
    currentTemp.innerHTML = temperature;
    weatherCondition.innerHTML = (response.data.condition.description);
    weatherConditionData.innerHTML = (humidityElement);
    weatherConditionDataTwo.innerHTML = (windElement);
    
    icon.innerHTML =  `<img
            src= "${response.data.condition.icon_url}"
            width="120px"
            class="weatherEmoji"
          />`

    getForecast(response.data.city);
};


function updateTime() {
 let currentDate = document.querySelector("#current-Date");
let timeElement = moment();
currentDate.innerHTML = timeElement.format(`dddd,  h:mm a `);   
};

setInterval(updateTime);


function displayCity(city) {
    let apiKey = "50a8380f4oe8265a54940c506tc9b3e0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
    axios.get(apiUrl).then(displayTemp);
};

function search(event) {
    event.preventDefault();
    let searchFormInput = document.querySelector("#search-Form-Input");
    let currentCity = document.querySelector("#current-City");
     let city = searchFormInput.value;
    currentCity.innerHTML = (city);
   displayCity(searchFormInput.value);
};

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
     let apiKey = "50a8380f4oe8265a54940c506tc9b3e0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);



let forecastHtml = "";

response.data.daily.forEach(function(day, index) {
    if (index < 5) {
     forecastHtml = forecastHtml + `  
<div class="weather-Forecast">
          <ul class="forecast-list">
            <li class="forecast-Day">${formatDay(day.time)}</li>
            <li class="forecast-Emoji">
            <img src="${day.condition.icon_url}" width=70px>
            </li>
            <li class="forecast-Data">
              <strong class="forecast-Temp-Mini">${Math.round(day.temperature.maximum)}°</strong>
              <span class="forecast-Temp-Maxi">${Math.round(day.temperature.minimum)}°</span>
            </li>
          </ul>
        </div>
        `;    
    }
   

});
let weatherForecastElement = document.querySelector("#weather-Forecast-Box");
weatherForecastElement.innerHTML = forecastHtml;

}


let searchForm = document.querySelector("#search-Form");
searchForm.addEventListener("submit", search);

displayCity("Portland");

displayForecast();
