import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setError("");
    setApiError("");
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      if (err.response) {
        // API responded but with error
        if (err.response.status === 404) {
          setError("City not found!");
        } else if (err.response.status === 401) {
          setError("Invalid API Key.");
        } else {
          setError(`Error: ${err.response.statusText} (${err.response.status})`);
        }
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection.");
      } else {
        // Other errors
        setError("An unknown error occurred.");
      }

      setApiError(err.message || "API error.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="City"
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Optionally display raw API error for debugging:
      {apiError && <p style={{ color: "gray", fontSize: "0.85em" }}>{apiError}</p>}
      */}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {weather.name}, {weather.sys && weather.sys.country}
          </h2>
          <p>Temperature: {weather.main && weather.main.temp} °C</p>
          <p>
            Weather: {weather.weather && weather.weather[0] && weather.weather[0].main}
          </p>
          <p>Humidity: {weather.main && weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind && weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
