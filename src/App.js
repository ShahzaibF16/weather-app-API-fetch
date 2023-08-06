// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'ba9b00f67160247529d2816ba392acac'; // Replace this with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // You can change this to 'imperial' for Fahrenheit
        },
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name..."
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div className="p-4 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold mb-2">Weather in {weatherData.name}</h2>
          <p className="text-gray-800">Temperature: {weatherData.main.temp}°C</p>
          <p className="text-gray-800">Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
