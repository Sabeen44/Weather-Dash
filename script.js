var currentContainer = document.getElementById("current-weather");
var submitButton = document.getElementById("submit-button");
var formSubmit = document.getElementById("search-city");
var formInput = document.getElementById("city-name");
var forecastList = document.getElementById("forecast-list");
var forecastContainer = document.getElementById("forecast-weather");
var cityButtons = document.getElementById("buttons");

function currentWeather() {
  //city = formInput.value;

  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  console.log(queryUrl);

  fetch(queryUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      var cityName = document.createElement("h2");
      cityName.textContent = data.name;

      var iconEl = document.createElement("p");
      var icon = data.weather[0].icon;
      //var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      var iconUrl = "https://openweathermap.org/img/wn/" + icon;
      iconEl.html = "<img src='" + iconUrl + ".png'>";

      var temp = document.createElement("h4");
      temp.innerHTML = "Temp:" + Math.round(data.main.temp) + `&#186;`;

      var humidity = document.createElement("h4");
      humidity.innerHTML = "Humidity:  " + data.main.humidity + `&nbsp;&#37;`;

      var wind = document.createElement("h4");
      wind.textContent = "Wind Speed: " + data.wind.speed + " mph";

      currentContainer.appendChild(cityName);
      currentContainer.appendChild(iconEl);
      currentContainer.appendChild(temp);
      currentContainer.appendChild(humidity);
      currentContainer.appendChild(wind);
    });
  var exists = cities.includes(city);
  if (!exists) {
    cities.push(city.toUpperCase());
  }
  storeCities();
  //  printCities();
}
