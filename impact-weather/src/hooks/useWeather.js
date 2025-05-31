import { useState, useEffect, useCallback } from 'react';
import { getWeatherByCoordinates } from '../services/weatherService.js';

/**
 * Custom hook for fetching weather data based on coordinates
 * @param {number|null} latitude - The latitude coordinate
 * @param {number|null} longitude - The longitude coordinate
 * @returns {Object} Weather data and related functions
 */
export function useWeather(latitude, longitude, isMetric=true) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "05ba03f30ada36832e90e46f1d750efd";

  const parseWeatherError = (err) => {
    if (err.code === 'TIMEOUT') {
      return "Weather service request timed out. Please check your connection and try again.";
    }
    switch (err.status) {
      case 401:
        return "Weather service API key invalid or expired.";
      case 404:
        return "Weather data not available for your location.";
      case 429:
        return "Too many weather requests. Please try again later.";
      default:
        return `Weather service error: ${err.message}`;
    }
  };

  const fetchWeather = useCallback(async () => {
    if (latitude === null || longitude === null) return;

    setIsLoading(true);
    try {
      const data = await getWeatherByCoordinates(latitude, longitude, API_KEY, isMetric);
      setWeather(data);
      setError(null);
      console.log("Got weather:", data);
    } catch (err) {
      console.error("Weather error:", err);
      setError(parseWeatherError(err));
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    isWeatherLoading: isLoading,
    weatherError: error,
    fetchWeather
  };
}

export default useWeather;