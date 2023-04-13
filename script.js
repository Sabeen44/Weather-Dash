var currentContainer = document.getElementById("current-weather");
var submitButton = document.getElementById("submit-button");
var formSubmit = document.getElementById("search-city");
var formInput = document.getElementById("city-name");
var forecastList = document.getElementById("forecast-list");
var forecastContainer = document.getElementById("forecast-weather");
var cityButtons = document.getElementById("buttons");

var apiKey = "c2183fb4c5521d3be3937d6deaa528c5";

var city;

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

var todayDate = dayjs().format("dddd, MMM D YYYY");
$("#currentDay").text(todayDate);

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

function currentWeather() {
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

      var iconEl = document.createElement("img");
      var icon = data.weather[0].icon;
      iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      iconEl.style.width = "100px";
      iconEl.style.height = "100px";
      var temp = document.createElement("h4");
      temp.innerHTML = "Temp:" + Math.round(data.main.temp) + `&#186;`;

      var humidity = document.createElement("h4");
      humidity.innerHTML = "Humidity:  " + data.main.humidity + `&nbsp;&#37;`;

      var wind = document.createElement("h4");
      wind.textContent = "Wind Speed: " + data.wind.speed + " mph";

      currentContainer.innerHTML = "";
      currentContainer.appendChild(cityName);
      currentContainer.appendChild(iconEl);
      currentContainer.appendChild(temp);
      currentContainer.appendChild(humidity);
      currentContainer.appendChild(wind);
    });

  var exists = cities.includes(city.toUpperCase());
  if (!exists) {
    cities.push(city.toUpperCase());
  }
  storeCities();
  //  printCities();
}

function printCities() {
  for (var i = 0; i < cities.length; i++) {
    //var storedCity = cities[i];
    var btn = document.createElement("button");
    btn.textContent = cities[i];
    btn.className = "buttonClass";
    cityButtons.appendChild(btn);
  }
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

      forecastContainer.innerHTML = "";

      for (var i = 0; i < data.cnt; i++) {
        var listElement = data.list[i];
        var unorderedList = document.createElement("ul");
        var listDate = document.createElement("li");

        var listTemp = document.createElement("li");

        var listHumidity = document.createElement("li");
        var listWind = document.createElement("li");
        var iconEl = document.createElement("img");

        listDate.textContent = listElement.dt_txt.slice(0, 10);
        listTemp.innerHTML =
          "Temp:" + Math.round(listElement.main.temp) + `&#186;`;

        listHumidity.textContent = "Humidity:" + listElement.main.humidity;

        listWind.textContent = "Wind Speed:" + listElement.wind.speed;

        forecastContainer.append(unorderedList);

        var icon = listElement.weather[0].icon;
        iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        iconEl.style.width = "100px";
        iconEl.style.height = "100px";
        unorderedList.appendChild(listDate);
        forecastContainer.appendChild(iconEl);

        forecastContainer.appendChild(listTemp);

        forecastContainer.appendChild(listHumidity);

        forecastContainer.appendChild(listWind);
      }
    });
}

function weatherForm() {
  city = formInput.value;
  currentWeather();
  forecastWeather();
}

function weatherButton() {
  currentWeather();
  forecastWeather();
}

function clearForm() {
  formInput.value = "";
}

submitButton.addEventListener("click", weatherForm);

formSubmit.addEventListener("submit", formSubmitHandler);

formInput.addEventListener("click", clearForm);

cityButtons.addEventListener("click", (event) => {
  if (event.target.className === "buttonClass") {
    city = event.target.textContent;
    weatherButton();

    console.log("Click");
  }
});

initCities();
printCities();
