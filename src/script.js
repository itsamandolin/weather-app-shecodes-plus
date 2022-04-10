let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let divDateTime = document.querySelector("#dateTime");
divDateTime.innerHTML = `${day} ${month} ${date} || ${hours}:${minutes}`;

function showForecast(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentForecast = document.querySelector("#currentForecast");
  currentForecast.innerHTML = `${temperature}°C`;
}

function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityCountry = document.querySelector("#cityCountry");
  if (searchInput.value) {
    cityCountry.innerHTML = `${searchInput.value}`;
  } else {
    cityCountry.innerHTML = "Please type a city";
  }
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=${units}`;

  axios.get(url).then(showForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchResult);

function positionWeather(current) {
  let temperature = Math.round(current.data.main.temp);
  let currentForecast = document.querySelector("#currentForecast");
  currentForecast.innerHTML = `${temperature}°C`;
  let cityCountry = document.querySelector("#cityCountry");
  cityCountry.innerHTML = current.data.name;
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let key = "77ae0cb67cde28551602feb9f0ea333b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
  axios.get(url).then(positionWeather);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", retrievePosition);
