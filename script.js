const APIkey = '8bc03c53619b53e2a55878c043a1bdc1';
const CITY = document.getElementById('cityInput');


function fetchWeatherData(city) {
  const geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
  let weatherURL = '';
  fetch(geocodingURL)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data[0];
      weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
          
          const forecastList = data.list;
            
          for (let i = 0; i < forecastList.length; i++) {
            const forecastData = forecastList[i];
            const forecastLowF = ((forecastData.main.temp_min - 273.15) * 9/5 + 32).toFixed(0);
            const forecastHighF = ((forecastData.main.temp_max - 273.15) * 9/5 + 32).toFixed(0);
            const forecastDate = new Date(forecastData.dt * 1000);
          
            const temperatureHighEl = document.createElement('div');
            temperatureHighEl.textContent = `High: ${Math.round(forecastHighF)}°F`;
            const temperatureHighContainer = document.querySelector(`.forecast-item:nth-of-type(${i + 2}) .forecast-temperature-high`);
            if (temperatureHighContainer) {
              temperatureHighContainer.innerHTML = '';
              temperatureHighContainer.appendChild(temperatureHighEl);
            }
          
            const temperatureLowEl = document.createElement('div');
            temperatureLowEl.textContent = `Low: ${Math.round(forecastLowF)}°F`;
            const temperatureLowContainer = document.querySelector(`.forecast-item:nth-of-type(${i + 3}) .forecast-temperature-low`);
            if (temperatureLowContainer) {
              temperatureLowContainer.innerHTML = '';
              temperatureLowContainer.appendChild(temperatureLowEl);
            }
          
            const weatherIconEl = document.createElement('img');
            weatherIconEl.src = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
            const weatherIconContainer = document.querySelector(`.forecast-item:nth-of-type(${i}) .forecast-description`);
            if (weatherIconContainer) {
              weatherIconContainer.innerHTML = '';
              weatherIconContainer.appendChild(weatherIconEl);
            }
          
            const forecastDescriptionEl = document.createElement('div');
            forecastDescriptionEl.textContent = forecastData.weather[0].description;
            const forecastDescriptionContainer = document.querySelector(`.forecast-item:nth-of-type(${i + 4}) .forecast-description`);
            if (forecastDescriptionContainer) {
              forecastDescriptionContainer.innerHTML = '';
              forecastDescriptionContainer.appendChild(forecastDescriptionEl);
            }
          
            const dateEl = document.createElement('div');
            dateEl.textContent = forecastDate.toLocaleDateString();
            const dateContainer = document.querySelector(`.forecast-item:nth-of-type(${i + 1}) .forecast-item-date`);
            if (dateContainer) {
              dateContainer.innerHTML = '';
              dateContainer.appendChild(dateEl);
            }
          }
          
          
      });
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const city = CITY.value.trim();
  if (city !== '') {
    fetchWeatherData(city);
  }
}

const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', handleFormSubmit);
