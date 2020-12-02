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

function realTemp(response) {
  //retrieve temperature
  let realTemp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#currentTemp");
  newTemp.innerHTML = `${realTemp}`;
}

function celsiusTemp(event) {
  //Display Celsius
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");

  let cityName = `${inputCity.value}`;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(realTemp);
}

function fahrenheightTemp(event) {
  //Display Fahrenheight
  event.preventDefault();

  let inputCity = document.querySelector("#input-city");
    let cityName = `${inputCity.value}`;
    let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
    let units = "imperial";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(realTemp);

}

function searchCity(event) {
  //Display City
  event.preventDefault();

  let inputCity = document.querySelector("#input-city");
  let newCity = document.querySelector("h1");
  newCity.innerHTML = `${inputCity.value}`;

  let cityName = `${inputCity.value}`;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(realTemp);
}
function displayCurrentCity(response) {
  let inputCity = response.data.name;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = `${inputCity}`;
}

function currentCity(position) {
  //Display current city
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "14b4ec50bfdac6afc3e3c9dd658e26fe";
  let units = "metric";
  // need to display current city ant temp based on latitude
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentCity);
  axios.get(apiUrl).then(realTemp);
}

function sendCurrentCity(event) {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let localDate = document.querySelector("#date");
let now = new Date();
console.log(now);
localDate.innerHTML = fomratDate(now);

let form = document.querySelector("#new-city");
let apiUrl = form.addEventListener("submit", searchCity);

let fahrenheight = document.querySelector("#fahrenheight-link");
fahrenheight.addEventListener("click", fahrenheightTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusTemp);

let cityForm = document.querySelector("#current-city");
cityForm.addEventListener("submit", sendCurrentCity);
