const APIkey = '8bc03c53619b53e2a55878c043a1bdc1';
const CITY = document.getElementById('cityInput');

function fetchWeatherData(city) {
  const geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
  fetch(geocodingURL)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
          const forecastList = data.list;

          for (let i = 0; i < forecastList.length; i += 5) {
            const forecastData = forecastList[i];

            
            const forecastDate = new Date(forecastData.dt * 1000);

            const temperatureHigh = forecastData.main.temp_max;
            const temperatureHighF = (temperatureHigh - 273.15) * 9 / 5 + 32;
            const temperatureHighEl = document.createElement('div');
            temperatureHighEl.textContent = `High: ${Math.round(temperatureHighF)}°F`;
            document.querySelector(`.forecast-item:nth-of-type(${i/5+1}) .forecast-temperature-high`).appendChild(temperatureHighEl);

            const temperatureLow = forecastData.main.temp_min;
            const temperatureLowF = (temperatureLow - 273.15) * 9 / 5 + 32;
            const temperatureLowEl = document.createElement('div');
            temperatureLowEl.textContent = `Low: ${Math.round(temperatureLowF)}°F`;
            document.querySelector(`.forecast-item:nth-of-type(${i/5+1}) .forecast-temperature-low`).appendChild(temperatureLowEl);

            const weatherIconEl = document.createElement('img');
            weatherIconEl.src = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
            document.querySelector(`.forecast-item:nth-of-type(${i/5+1}) .forecast-description`).appendChild(weatherIconEl);
            

            const weatherDescription = forecastData.weather[0].description;
            const weatherDescriptionEl = document.createElement('div');
            weatherDescriptionEl.textContent = weatherDescription;
            document.querySelector(`.forecast-item:nth-of-type(${i/5+1}) .forecast-description`).appendChild(weatherDescriptionEl);

            
            const dateEl = document.createElement('div');
            dateEl.textContent = forecastDate.toLocaleDateString();
            document.querySelector(`.forecast-item:nth-of-type(${i/5+1})`).appendChild(dateEl);
          }
        });
    });
}

const forecastItems = document.querySelectorAll('.forecast-item');
forecastItems.forEach(item => item.style.display = 'block');

function handleFormSubmit(event) {
  event.preventDefault();
  const city = CITY.value.trim();
  if (city !== '') {
    fetchWeatherData(city);
  }
}

const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', handleFormSubmit);






       







 
  