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

//Display correct weekdays
let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function celsiusTemp(event) {
  //Display Celsius
  event.preventDefault();
  let cityName = document.querySelector("#city").innerHTML;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function fahrenheitTemp(event) {
  //Display Fahrenheight
  event.preventDefault();

  let cityName = document.querySelector("#city").innerHTML;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);

  let mainIcon = document.querySelector("#mainIcon");
  console.log(response.data.weather[0].description);
  let iconDesc = document.querySelector("#weather-description");
  iconDesc.innerHTML = response.data.weather[0].description;

  if (response.data.weather[0].main.toLowerCase() === "clear") {
    mainIcon.setAttribute("src", "/Weather_App_SheCodes/Immg/Sun.png");
  } else {
    if (response.data.weather[0].main.toLowerCase() === "rain") {
      mainIcon.setAttribute("src", "/Weather_App_SheCodes/Immg/Rain.png");
    } else {
      if (response.data.weather[0].main.toLowerCase() === "drizzle") {
        mainIcon.setAttribute("src", "/Weather_App_SheCodes/Immg/Drizzle.png");
      } else {
        if (response.data.weather[0].main.toLowerCase() === "clouds") {
          mainIcon.setAttribute("src", "/Weather_App_SheCodes/Immg/Cloudy.png");
        } else {
          if (
            response.data.weather[0].main.toLowerCase() === "snow" ||
            response.data.weather[0].main.toLowerCase() === "hail"
          ) {
            mainIcon.setAttribute("src", "/Weather_App_SheCodes/Immg/Snow.png");
          } else {
            if (
              response.data.weather[0].main.toLowerCase() === "fog" ||
              response.data.weather[0].main.toLowerCase() === "mist"
            ) {
              mainIcon.setAttribute(
                "src",
                "/Weather_App_SheCodes/Immg/Fog.png"
              );
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(sendCurrentCity);
}

let localDate = document.querySelector("#date");
let now = new Date();
console.log(now);
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
