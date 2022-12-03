let weather = document.querySelector(".weather");

function windDirection(deg) {
  let directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];

  let index = Math.round((deg % 360) / 22.5);

  return directions[index];
}

function fetchWeather(
  q,
  lat,
  lon,
  units = "metric",
  appid = "5aeaa29c5aa0bfc84079f9119921a6fb"
) {
  return axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q,
        lat,
        lon,
        units,
        appid,
      },
    })
    .then(function (response) {
      return response.data;
    });
}

async function fetchCountry(code) {
  let { data } = await axios.get(
    `https://restcountries.com/v3.1/alpha/${code}`
  );

  return data[0].name.common;
}

async function buildWeather(data) {
  let country = await fetchCountry(data.sys.country);

  let html = `
    <h4>${data.name}, ${country}</h4>

    <div class="weather-main">
      <img src="http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@4x.png" width="100">

      <div>
        <h3>${data.weather[0].main}</h3>
        <span>${
          data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1)
        }</span>
      </div>
    </div>

    <div class="weather-body">
      <div class="weather-item">
        <h4>Temperature</h4>
        <span>${data.main.temp}°C</span>        
      </div>

      <div class="weather-item">
        <h4>Min temperature</h4>
        <span>${data.main.temp_min}°C</span>        
      </div>

      <div class="weather-item">
        <h4>Max temperature</h4>
        <span>${data.main.temp_max}°C</span>        
      </div>

      <div class="weather-item">
        <h4>Real feel</h4>
        <span>${data.main.feels_like}°C</span>        
      </div>

      <div class="weather-item">
        <h4>Humidity</h4>
        <span>${data.main.humidity}%</span>        
      </div>

      <div class="weather-item">
        <h4>Pressure</h4>
        <span>${data.main.pressure} hPa</span>        
      </div>

      <div class="weather-item">
        <h4>Wind</h4>
        <span>${data.wind.speed} m/s ${windDirection(
    data.wind.deg
  )}</span>        
      </div>
    </div>
  `;

  weather.innerHTML = html;
}
