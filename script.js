const APIkey = '8bc03c53619b53e2a55878c043a1bdc1';
const CITY = document.getElementById('cityInput');

function fetchWeatherData(city) {
  const geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`;
  fetch(geocodingURL)
    .then(response => response.json())
    .then(data => {
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
      fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
          const weatherIcon = document.querySelector('.wi');
          weatherIcon.className += ` wi-${data.weather[0].id}`;
      
          const temperature = document.querySelector('.temperature');
      const fahrenheit = (data.main.temp - 273.15) * 9 / 5 + 32;
      temperature.textContent = `${Math.round(fahrenheit)}°F`;
      
          const location = document.querySelector('.cityName');
          location.textContent = `${data.name}, ${data.sys.country}`;
      
          const weatherDescription = document.querySelector('.weather-description');
          weatherDescription.textContent = data.weather[0].description;
        })

      })
     
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

 
  
  
  




 
  