const fetch = require('node-fetch');

// fetch 7 day forecast for location weather.gov API
exports.getForecast = async (location) => {
  const apiUrl = `https://api.weather.gov/points/${location}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data && data.properties.forecast) {
    const relativeLocation = data.properties.relativeLocation.properties;
    const response = await fetch(data.properties.forecast);
    const forecastData = await response.json();

    return {
      location: `${relativeLocation.city}, ${relativeLocation.state} (Stn: ${data.properties.radarStation})`,
      ...forecastData,
    };
  } else {
    return null;
  }
};
