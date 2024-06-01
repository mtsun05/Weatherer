const card = document.querySelector(".card");
const button = document.querySelector(".submit-btn");
const input = document.querySelector(".search-box");
let TEMP = document.querySelector(".temp").innerHTML;
let HUM = document.querySelector(".hum").innerHTML;
let WSPEED = document.querySelector(".wind-speed").innerHTML;
let WDIR = document.querySelector(".wind-direction").innerHTML;
let FEELIKE = document.querySelector(".feels-like").innerHTML;

input.onkeydown = (event) => {
  if (event.key === "Enter") {
    card.classList.add("display-card");
    getWeatherData();
  }
};

button.onclick = () => {
  card.classList.add("display-card");
  getWeatherData();
};

function getWeatherData() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city.");
    return;
  }

  fetchWeatherData(city);
}

function fetchWeatherData(city) {
  const apiKey = "0b66c592b27b1666ab468ae98bd7a19b";

  // const url = `https://api.weather.com/v1/location/${city.toLowerCase().replace(/\s/g, '')}:9:US/observations/historical.json?apiKey=YOUR_API_KEY&startDate=${date}&endDate=${date}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (!json) {
        alert("Weather data not available for the specified date.");
        return;
      }

      displayData(json);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });
}

function displayData(json) {
  resetDisplay();

  const toDisplay = {
    city: json.name,
    temp: json.main.temp,
    humidity: json.main.humidity,
    feelsLike: json.main.feels_like,
    windSpeed: json.wind.speed,
    windDirection: degToDir(json.wind.deg),
  };

  document.querySelector(
    ".card-title"
  ).innerHTML = `Weather in ${toDisplay.city}`;
  document.querySelector(".temp").innerHTML += toDisplay.temp + "°C";
  document.querySelector(".hum").innerHTML += toDisplay.humidity + "%";
  document.querySelector(".wind-speed").innerHTML +=
    toDisplay.windSpeed + "m/s";
  document.querySelector(".wind-direction").innerHTML +=
    toDisplay.windDirection;
  document.querySelector(".feels-like").innerHTML += toDisplay.feelsLike + "°C";

  console.log(toDisplay);
}

function degToDir(deg) {
  const windDirections = new Map([
    [350, "N"],
    [360, "N"],
    [10, "N"],
    [20, "N/NE"],
    [30, "N/NE"],
    [40, "NE"],
    [50, "NE"],
    [60, "E/NE"],
    [70, "E/NE"],
    [80, "E"],
    [90, "E"],
    [100, "E"],
    [110, "E/SE"],
    [120, "E/SE"],
    [130, "SE"],
    [140, "SE"],
    [150, "S/SE"],
    [160, "S/SE"],
    [170, "S"],
    [180, "S"],
    [190, "S"],
    [200, "S/SW"],
    [210, "S/SW"],
    [220, "SW"],
    [230, "SW"],
    [240, "W/SW"],
    [250, "W/SW"],
    [260, "W"],
    [270, "W"],
    [280, "W"],
    [290, "W/NW"],
    [300, "W/NW"],
    [310, "NW"],
    [320, "NW"],
    [330, "N/NW"],
    [340, "N/NW"],
  ]);
  return windDirections.get(deg);
}

function resetDisplay() {
  document.querySelector(".temp").innerHTML =
    '<img id="therm" src="/assets/thermometer-half.svg"> Temperature: ';
  document.querySelector(".hum").innerHTML =
    '<img id="hum" src="/assets/droplet-fill.svg"> Humidity: ';
  document.querySelector(".wind-speed").innerHTML =
    '<img id="wind" src="/assets/wind.svg"> Wind Speed: ';
  document.querySelector(".wind-direction").innerHTML =
    '<img id="comp" src="/assets/compass.svg"> Wind Direction: ';
  document.querySelector(".feels-like").innerHTML =
    '<img class="feels-like" src="/assets/feels-like.svg"> Feels Like: ';
}
