var currentContainer = document.getElementById("current-weather");
var submitButton = document.getElementById("submit-button");
var formSubmit = document.getElementById("search-city");
var formInput = document.getElementById("city-name");
var forecastList = document.getElementById("forecast-list");
var forecastContainer = document.getElementById("forecast-weather");
var cityButtons = document.getElementById("buttons");

var cities = [];

function initCities() {
  var storedCities = JSON.parse(localStorage.getItem("citylist"));

  if (storedCities !== null) {
    cities = storedCities;
  }
}

function storeCities() {
  localStorage.setItem("citylist", JSON.stringify(cities));
}

var apiKey = "c2183fb4c5521d3be3937d6deaa528c5";

var todayDate = dayjs().format("dddd, MMM D YYYY");
$("#currentDay").text(todayDate);

//

var formSubmitHandler = function (event) {
  event.preventDefault();

  if (city) {
    weatherForm;
    currentContainer.textContent = "";
    forecastContainer.textContent = "";
    formInput.value = "";
  } else {
    alert("Please enter a city");
  }
};

var city;

function weatherForm() {
  city = formInput.value;
  currentWeather();
  forecastWeather();
}

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

function forecastWeather() {
  var query2Url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    apiKey +
    "&cnt=5";

  console.log(query2Url);

  fetch(query2Url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      for (var i = 0; i < data.cnt; i++) {
        var unorderedList = document.createElement("ul");
        var listCity = document.createElement("li");

        var listTemp = document.createElement("li");
        var listElement = data.list[i];
        var listHumidity = document.createElement("li");
        var listWind = document.createElement("li");

        listCity.textContent = listElement.dt_txt.slice(0, 10);
        unorderedList.appendChild(listCity);
        forecastContainer.append(unorderedList);

        listTemp.innerHTML =
          "Temp:" + Math.round(listElement.main.temp) + `&#186;`;
        forecastContainer.appendChild(listTemp);
        //console.log("Temp: " + listElement.main.temp);
        listHumidity.textContent = "Humidity:" + listElement.main.humidity;
        forecastContainer.appendChild(listHumidity);
        listWind.textContent = "Wind Speed:" + listElement.wind.speed;
        forecastContainer.appendChild(listWind);
      }
    });
}

function weatherButton() {
  currentWeather();
  forecastWeather();
}

submitButton.addEventListener("click", weatherForm);

formSubmit.addEventListener("submit", formSubmitHandler);

cityButtons.addEventListener("click", (event) => {
  if (event.target.className === "buttonClass") {
    city = event.target.textContent;
    weatherButton();

    console.log("Click");
  }
});

initCities();
printCities();
