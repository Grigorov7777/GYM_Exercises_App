import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return; // Exit if no location is provided

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching new data

      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Use the API key from .env
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching weather data: {error}</Typography>;
  }

  if (!weatherData) {
    return <Typography>No weather data available</Typography>;
  }

  // Weather details
  const { main, weather, wind } = weatherData;

  return (
    <div>
      <Typography variant="h6">Weather in {location}</Typography>
      <Typography variant="body1">Temperature: {main.temp}°C</Typography>
      <Typography variant="body1">Condition: {weather[0].description}</Typography>
      <Typography variant="body1">Wind Speed: {wind.speed} m/s</Typography>
      
      {/* Suggest outdoor training based on weather */}
      <Typography variant="body1">
        {main.temp > 15 && main.temp < 30 && weather[0].main !== 'Rain' && wind.speed < 10
          ? 'Perfect weather for outdoor training!'
          : 'Consider indoor training due to weather conditions.'}
      </Typography>
    </div>
  );
};

export default Weather;

