import { useState, useEffect } from 'react';
import { getUserCoordinates } from '../services/locationService.js';
import { getWeatherByCoordinates } from '../services/weatherService.js';

function WeatherDisplay() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "05ba03f30ada36832e90e46f1d750efd";
  
  // Separate useEffect for location
  useEffect(() => {
    let isMounted = true;
    
    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        const coordinates = await getUserCoordinates();
        
        // Only update state if component is still mounted
        if (isMounted && coordinates && coordinates.latitude && coordinates.longitude) {
          setLocation(coordinates);
          console.log("Got coordinates:", coordinates);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Location error:", error.message);
          setError(`Failed to get location: ${error.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocation();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [location.latitude, location.longitude]);

  // Separate useEffect that depends on location changes
  useEffect(() => {
    let isMounted = true;
    
    const fetchWeather = async () => {
      // Only fetch weather if we have valid coordinates
      if (!location.latitude || !location.longitude) return;
      
      try {
        setLoading(true);
        setError(null);
        const weatherData = await getWeatherByCoordinates(
          location.latitude, 
          location.longitude,
          API_KEY
        );
        
        if (isMounted && weatherData) {
          setWeather(weatherData);
          console.log("Got weather:", weatherData);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Weather error:", error.message);
          setError(`Failed to get weather: ${error.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();
    
    return () => {
      isMounted = false;
    };
  }, [location.latitude, location.longitude]);

  // Retry functionality
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    
    // Force both effects to re-run by resetting location state
    setLocation({ latitude: null, longitude: null });
  };

  // Render different UI states
  if (loading && !weather) {
    return <div>Loading weather information...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleRetry}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Location</h2>
        {location.latitude && location.longitude ? (
          <p>Latitude: {location.latitude.toFixed(4)} | Longitude: {location.longitude.toFixed(4)}</p>
        ) : (
          <p>Location data unavailable</p>
        )}
      </div>

      <div>
        <h2>Weather Information</h2>
        {weather?.weatherData?.main ? (
          <>
            <p>Temperature: {weather.weatherData.main.temp}°</p>
            <p>Feels Like: {weather.weatherData.main.feels_like}°</p>
            {weather.weatherData.weather && weather.weatherData.weather[0] && (
              <p>Weather: {weather.weatherData.weather[0].description}</p>
            )}
            {weather.weatherData.wind && (
              <p>Wind: {weather.weatherData.wind.speed} mph, {weather.weatherData.wind.deg}°</p>
            )}
          </>
        ) : (
          <p>Weather data unavailable</p>
        )}
      </div>
      
      <button onClick={handleRetry}>
        Refresh Data
      </button>
    </div>
  );
}

export default WeatherDisplay;