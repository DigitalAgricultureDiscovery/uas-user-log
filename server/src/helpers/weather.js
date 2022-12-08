const fetch = require('node-fetch');

// fetch 7 day forecast for location using apixu
exports.getForecast = async (key, location) => {
  const apiUrl =
    'http://api.weatherstack.com/current?access_key=' +
    key +
    '&query=' +
    location +
    '&units=f';
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data;
};
