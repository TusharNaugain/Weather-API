import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const apiKey = "6eb455757cf887894b934b721d9910b7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  const fetchWeatherData = (location) => {
    fetch(`${apiUrl}?q=${location}&units=metric&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => setError(error.message));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData(location);
  };

  return (
    <div className="container">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter a city"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {weatherData.name && (
          <div className="weather-data">
            <h2>{weatherData.name}</h2>
            <p>
              <span>Temperature:</span> {weatherData.main.temp}°C
            </p>
            <p>
              <span>Description:</span> {weatherData.weather[0].description}
            </p>
            <p>
              <span>Date and Time:</span> {new Date().toLocaleString()}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherApp;