function fomratDate(date) {
  // Set Local Time //
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentTime = `${currentHour}:${currentMinutes}`;

  let time = document.querySelector("#local-time");
  time.innerHTML = currentTime;

  //Set Local Date
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();

  if (currentDay === 1) {
    descriptor = "st";
  } else {
    if (currentDay === 2) {
      descriptor = "nd";
    } else {
      if (currentDay === 3) {
        descriptor = "rd";
      } else {
        descriptor = "th";
      }
    }
  }

  return `${currentDay}${descriptor} ${currentMonth} ${currentYear}`;
}

function displayWeatherConditions(response) {
  //Today Forecast
  document.querySelector("h1").innerHTML = response.data.city.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.list[0].main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.list[0].wind.speed
  );

  let iconDesc = document.querySelector("#weather-description");
  iconDesc.innerHTML = response.data.list[0].weather[0].main;

  let mainIcon = document.querySelector("#mainIcon");
  let weatherDescription = response.data.list[0].weather[0].main.toLowerCase();

  if (weatherDescription === "clear") {
    mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Sun.png");
  } else {
    if (weatherDescription === "rain") {
      mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Rain.png");
    } else {
      if (weatherDescription === "drizzle") {
        mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Drizzle.png");
      } else {
        if (weatherDescription === "clouds") {
          mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Cloudy.png");
        } else {
          if (weatherDescription === "snow" || weatherDescription === "hail") {
            mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Snow.png");
          } else {
            if (
              response.data.weather[0].main.toLowerCase() === "fog" ||
              response.data.weather[0].main.toLowerCase() === "mist"
            ) {
              mainIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Fog.png");
            }
          }
        }
      }
    }
  }
}

function celsiusTemp(event) {
  //Display Celsius
  event.preventDefault();
  let cityName = document.querySelector("#city").innerHTML;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
  axios.get(apiUrl).then(displayForecast);
  document.querySelector("#wind-units").innerHTML = "m/s";
}

function fahrenheitTemp(event) {
  //Display Fahrenheight
  event.preventDefault();

  let cityName = document.querySelector("#city").innerHTML;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
  axios.get(apiUrl).then(displayForecast);
  document.querySelector("#wind-units").innerHTML = "mph";
}

function displayForecast(response) {
  let forecast = null;

  for (index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    let maxTempArray = [
      "#hour-one-max-temp",
      "#hour-two-max-temp",
      "#hour-three-max-temp",
      "#hour-four-max-temp",
      "#hour-five-max-temp",
    ];
    let minTempArray = [
      "#hour-one-min-temp",
      "#hour-two-min-temp",
      "#hour-three-min-temp",
      "#hour-four-min-temp",
      "#hour-five-min-temp",
    ];

    document.querySelector(maxTempArray[index]).innerHTML = Math.round(
      forecast.main.temp_max
    );
    document.querySelector(minTempArray[index]).innerHTML = Math.round(
      forecast.main.temp_min
    );
  }
}

function timeForecast(response) {
  let date = response.data.list[0].dt * 1000;
  let foreTime = null;

  for (index = 0; index < 5; index++) {
    foreTime = [
      "#hour-one",
      "#hour-two",
      "#hour-three",
      "#hour-four",
      "#hour-five",
    ];

    date = new Date(response.data.list[index].dt * 1000);

    let currentHour = date.getHours();
    if (currentHour < 10) {
      currentHour = `0${currentHour}`;
    }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
    }
    let time = `${currentHour}:${currentMinutes}`;

    document.querySelector(foreTime[index]).innerHTML = time;
  }
}

function secondaryIconsLoop(response) {
  let forcastInfo = null;
  for (index = 0; index < 5; index++) {
    let iconsArray = [
      "#hour-one-secondary-icon",
      "#hour-two-secondary-icon",
      "#hour-three-secondary-icon",
      "#hour-four-secondary-icon",
      "#hour-five-secondary-icon",
    ];
    let secondaryIcon = document.querySelector(iconsArray[index]);

    forcastInfo = response.data.list[index];
    if (forcastInfo.weather[0].main.toLowerCase() === "clear") {
      secondaryIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Sun.png");
    } else {
      if (forcastInfo.weather[0].main.toLowerCase() === "rain") {
        secondaryIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Rain.png");
      } else {
        if (forcastInfo.weather[0].main.toLowerCase() === "drizzle") {
          secondaryIcon.setAttribute(
            "src",
            "Weather_App_SheCodes/Immg/Drizzle.png"
          );
        } else {
          if (forcastInfo.weather[0].main.toLowerCase() === "clouds") {
            secondaryIcon.setAttribute(
              "src",
              "Weather_App_SheCodes/Immg/Cloudy.png"
            );
          } else {
            if (
              forcastInfo.weather[0].main.toLowerCase() === "snow" ||
              forcastInfo.weather[0].main.toLowerCase() === "hail"
            ) {
              secondaryIcon.setAttribute(
                "src",
                "Weather_App_SheCodes/Immg/Snow.png"
              );
            } else {
              if (
                forcastInfo.weather[0].main.toLowerCase() === "fog" ||
                forcastInfo.weather[0].main.toLowerCase() === "mist"
              ) {
                secondaryIcon.setAttribute(
                  "src",
                  "Weather_App_SheCodes/Immg/Fog.png"
                );
              }
            }
          }
        }
      }
    }
  }
}

function search(city) {
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(secondaryIconsLoop);
  axios.get(apiUrl).then(timeForecast);
}

function handleSearchCity(event) {
  //Display City
  event.preventDefault();
  let inputCity = document.querySelector("#input-city").value;
  search(inputCity);
}

function sendCurrentCity(position) {
  //Display current city
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(sendCurrentCity);
}

let localDate = document.querySelector("#date");
let now = new Date();
localDate.innerHTML = fomratDate(now);

let form = document.querySelector("#new-city");
let apiUrl = form.addEventListener("submit", handleSearchCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);

let cityForm = document.querySelector("#currentCityButton");
cityForm.addEventListener("click", getCurrentCity);

search("Florence");
