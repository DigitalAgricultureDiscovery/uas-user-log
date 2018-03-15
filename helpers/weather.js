const fetch = require('node-fetch');

// fetch 7 day forecast for location using apixu
exports.getForecast = async (key, location) => {
  const apiURL = 'http://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + location + '&days=5';
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
}
