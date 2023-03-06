const API_KEY = '8bc03c53619b53e2a55878c043a1bdc1';
async function fetchWeatherData(city) {
  const url = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const exclude = 'current,minutely,hourly';
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=imperial&appid=${API_KEY}`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    if (response2.ok) {
      return parseWeatherData(data2);
    } else {
      throw new Error(data2.message);
    }
  } else {
    throw new Error(data.message);
  }
}



function parseWeatherData(data) {
  const dailyWeatherData = [];
  const dailyDataMap = new Map();

  for (const daily of data.daily) {
    const date = new Date(daily.dt * 1000);
    const dateString = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const dailyData = {
      date: dateString,
      minTemp: Math.round(daily.temp.min),
      maxTemp: Math.round(daily.temp.max),
      description: daily.weather[0].description,
      icon: daily.weather[0].icon,
    };

    dailyWeatherData.push(dailyData);
  }

  return dailyWeatherData;
}



function displayWeatherData(weatherData) {
  const table = document.getElementById('weatherTable');
  table.innerHTML = '';

  const headerRow = document.createElement('tr');
  const dateHeader = document.createElement('th');
  const iconHeader = document.createElement('th');
  const descriptionHeader = document.createElement('th');
  const minTempHeader = document.createElement('th');
  const maxTempHeader = document.createElement('th');

  dateHeader.textContent = 'Date';
  iconHeader.textContent = 'Weather';
  descriptionHeader.textContent = 'Description';
  minTempHeader.textContent = 'Min Temp';
  maxTempHeader.textContent = 'Max Temp';

  headerRow.appendChild(dateHeader);
  headerRow.appendChild(iconHeader);
  headerRow.appendChild(descriptionHeader);
  headerRow.appendChild(minTempHeader);
  headerRow.appendChild(maxTempHeader);

  table.appendChild(headerRow);

  for (const dailyData of weatherData) {
    const row = document.createElement('tr');
    const dateCell = document.createElement('td');
    const iconCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const minTempCell = document.createElement('td');
    const maxTempCell = document.createElement('td');
    const icon = document.createElement('img');

    dateCell.textContent = dailyData.date;
    icon.src = `https://openweathermap.org/img/w/${dailyData.icon}.png`;
    icon.alt = dailyData.description;
    descriptionCell.textContent = dailyData.description;
    minTempCell.textContent = `${dailyData.minTemp}°F`;
    maxTempCell.textContent = `${dailyData.maxTemp}°F`;

    iconCell.appendChild(icon);
    row.appendChild(dateCell);
    row.appendChild(iconCell);
    row.appendChild(descriptionCell);
    row.appendChild(minTempCell);
    row.appendChild(maxTempCell);

    table.appendChild(row);
  }
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  const input = document.getElementById('cityInput');
  const weatherData = await fetchWeatherData(input.value);
  displayWeatherData(weatherData);
});
