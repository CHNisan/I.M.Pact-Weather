import { useState, useEffect, useCallback } from 'react';
import { getWeatherByCoordinates } from '../services/weatherService.js';

/**
 * Custom hook for fetching weather data based on coordinates
 * @param {number|null} latitude - The latitude coordinate
 * @param {number|null} longitude - The longitude coordinate
 * @returns {Object} Weather data and related functions
 */
export function useWeather(latitude, longitude) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "05ba03f30ada36832e90e46f1d750efd";

  const getFriendlyError = (err) => {
    if (err.code === 'TIMEOUT') return "Weather request timed out. Please try again.";
    if (err.status === 401) return "Invalid or expired API key.";
    if (err.status === 404) return "Weather data not found for the location.";
    if (err.status === 429) return "Too many requests. Please try again later.";
    return err.message || "Unknown error occurred while fetching weather.";
  };

  const fetchWeather = useCallback(async () => {
    if (latitude == null || longitude == null) return;

    setLoading(true);
    try {
      const { weatherData } = await getWeatherByCoordinates(latitude, longitude, API_KEY);
      setWeather(weatherData);
      setError(null);
    } catch (err) {
      console.error("Weather error:", err);
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    weatherLoading: loading,
    weatherError: error,
    fetchWeather
  };
}

export default useWeather;
