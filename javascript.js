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
// Forecast Day display

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

function displayWeatherConditions(response) {
  //Today Forecast
  document.querySelector("h1").innerHTML = response.data.city.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.list[0].main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.list[0].wind.speed
  );
  console.log(response.data);

  let iconDesc = document.querySelector("#weather-description");
  iconDesc.innerHTML = response.data.list[0].weather[0].main;

  let mainIcon = document.querySelector("#mainIcon");
  let weatherDescription = response.data.list[0].weather[0].main.toLowerCase();
  console.log(response.data.list[0].weather[0].main);

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
  document.querySelector("#wind-units").innerHTML = "mph";
}

/* function processForecast(response) {
  for (i = 0; i <= 5; i++) {
    console.log(Math.round(response.data.list[i].main.temp_max));
    
    let location = `#day-${arrrayNumber}-max-temp`;
    if ([i] === 0) {
      arrayNumber = "zero";
    } else {
      if ([i] === 1) {
        arrayNumber = "one";
      } else {
        if ([i] === 2) {
          arrayNumber = "two";
        } else {
          if ([i] === 3) {
            arrayNumber = "three";
          } else {
            if ([i] === 4) {
              arrayNumber = "four";
            } else {
              if ([i] === 5) {
                arrayNumber = "five";
              }
            }
          }
        }
      }
    } */
//Attempt for loop forecast
/* 
function displayForecast(response) {
  //Day Zero
  document.querySelector("#day-zero-max-temp").innerHTML = Math.round(
    response.data.list[0].main.temp_max
  );
  document.querySelector("#day-zero-min-temp").innerHTML = Math.round(
    response.data.list[0].main.temp_min
  );
  //Day One
  document.querySelector("#day-one-max-temp").innerHTML = Math.round(
    response.data.list[1].main.temp_max
  );
  document.querySelector("#day-one-min-temp").innerHTML = Math.round(
    response.data.list[1].main.temp_min
  );
  //Day Two
  document.querySelector("#day-two-max-temp").innerHTML = Math.round(
    response.data.list[2].main.temp_max
  );
  document.querySelector("#day-two-min-temp").innerHTML = Math.round(
    response.data.list[2].main.temp_min
  );
  //Day Three
  document.querySelector("#day-three-max-temp").innerHTML = Math.round(
    response.data.list[3].main.temp_max
  );
  document.querySelector("#day-three-min-temp").innerHTML = Math.round(
    response.data.list[3].main.temp_min
  );
  //Day Four
  document.querySelector("#day-four-max-temp").innerHTML = Math.round(
    response.data.list[4].main.temp_max
  );
  document.querySelector("#day-four-min-temp").innerHTML = Math.round(
    response.data.list[4].main.temp_min
  );
  //Day Five
  document.querySelector("#day-five-max-temp").innerHTML = Math.round(
    response.data.list[5].main.temp_max
  );
  document.querySelector("#day-five-min-temp").innerHTML = Math.round(
    response.data.list[5].main.temp_min
  );
}

function secondaryIcons(response) {
  let secondaryIcon = document.querySelector("#day-one-secondary-icon");
  for (i = 0; i <= 5; i++)
    if (response.data.list[i].weather[0].main.toLowerCase() === "clear") {
      secondaryIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Sun.png");
    } else {
      if (response.data.list[i].weather[0].main.toLowerCase() === "rain") {
        secondaryIcon.setAttribute("src", "Weather_App_SheCodes/Immg/Rain.png");
      } else {
        if (response.data.list[i].weather[0].main.toLowerCase() === "drizzle") {
          secondaryIcon.setAttribute(
            "src",
            "Weather_App_SheCodes/Immg/Drizzle.png"
          );
        } else {
          if (
            response.data.list[i].weather[0].main.toLowerCase() === "clouds"
          ) {
            secondaryIcon.setAttribute(
              "src",
              "Weather_App_SheCodes/Immg/Cloudy.png"
            );
          } else {
            if (
              response.data.list[i].weather[0].main.toLowerCase() === "snow" ||
              response.data.list[i].weather[0].main.toLowerCase() === "hail"
            ) {
              secondaryIcon.setAttribute(
                "src",
                "Weather_App_SheCodes/Immg/Snow.png"
              );
            } else {
              if (
                response.data.list[i].weather[0].main.toLowerCase() === "fog" ||
                response.data.list[i].weather[0].main.toLowerCase() === "mist"
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
} */

function search(city) {
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(secondaryIcons);
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
