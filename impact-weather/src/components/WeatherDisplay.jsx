import { useState, useEffect } from 'react';
import { getUserCoordinates, getApproximateLocationFromIP } from '../services/locationService.js';
import { getWeatherByCoordinates } from '../services/weatherService.js';

function WeatherDisplay() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApproximateLocation, setIsApproximateLocation] = useState(false);
  const API_KEY = "05ba03f30ada36832e90e46f1d750efd";
  
  // Handle location fetch and related errors
  useEffect(() => {
    let isMounted = true;
    
    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get precise location first
        const coordinates = await getUserCoordinates();
        
        if (isMounted) {
          setLocation(coordinates);
          setIsApproximateLocation(false);
          console.log("Got precise coordinates:", coordinates);
        }
      } catch (locationError) {
        console.error("Location error:", locationError);
        
        // Handle specific location errors
        if (locationError.code === 'PERMISSION_DENIED') {
          // Try fallback to IP-based location
          try {
            if (isMounted) {
              console.log("Trying IP-based location fallback...");
              const approxLocation = await getApproximateLocationFromIP();
              
              if (isMounted) {
                setLocation(approxLocation);
                setIsApproximateLocation(true);
                console.log("Got approximate coordinates:", approxLocation);
              }
            }
          } catch (fallbackError) {
            if (isMounted) {
              setError("Location access denied and fallback location failed. Please enable location services or try again later.");
            }
          }
        } else if (locationError.code === 'TIMEOUT') {
          if (isMounted) {
            setError("Location request timed out. Please check your connection and try again.");
          }
        } else if (locationError.code === 'POSITION_UNAVAILABLE') {
          if (isMounted) {
            setError("Unable to determine your location. Please try again later.");
          }
        } else {
          if (isMounted) {
            setError(`Location error: ${locationError.message}`);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle weather fetch and related errors - depends on location
  useEffect(() => {
    let isMounted = true;
    
    const fetchWeather = async () => {
      // Only fetch weather if we have valid coordinates
      if (!location || location.latitude === null || location.longitude === null) {
        return;
      }
      
      try {
        setLoading(true);
        
        const weatherData = await getWeatherByCoordinates(
          location.latitude, 
          location.longitude,
          API_KEY
        );
        
        if (isMounted) {
          setWeather(weatherData);
          setError(null);
          console.log("Got weather:", weatherData);
        }
      } catch (weatherError) {
        if (isMounted) {
          console.error("Weather error:", weatherError);
          
          // Handle specific weather API errors
          if (weatherError.code === 'TIMEOUT') {
            setError("Weather service request timed out. Please check your connection and try again.");
          } else if (weatherError.status === 401) {
            setError("Weather service API key invalid or expired.");
          } else if (weatherError.status === 404) {
            setError("Weather data not available for your location.");
          } else if (weatherError.status === 429) {
            setError("Too many weather requests. Please try again later.");
          } else {
            setError(`Weather service error: ${weatherError.message}`);
          }
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
  }, [location?.latitude, location?.longitude]);

  // Retry functionality with option to try IP-based location
  const handleRetry = (useIPFallback = false) => {
    setError(null);
    setLoading(true);
    
    if (useIPFallback) {
      // Skip geolocation and go straight to IP-based fallback
      (async () => {
        try {
          const approxLocation = await getApproximateLocationFromIP();
          setLocation(approxLocation);
          setIsApproximateLocation(true);
        } catch (error) {
          setError("Failed to get approximate location. Please try again.");
          setLoading(false);
        }
      })();
    } else {
      // Force both effects to re-run by resetting location state
      setLocation({ latitude: null, longitude: null });
    }
  };

  // Format temperature with units
  const formatTemp = (temp) => {
    if (temp === undefined || temp === null) return 'N/A';
    return `${Math.round(temp)}°C`;
  };

  // Render loading state
  if (loading && !weather) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <div className="flex items-center justify-center">
          <div className="text-xl font-medium text-gray-700">Loading weather information...</div>
        </div>
      </div>
    );
  }

  // Render error state with appropriate retry options
  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <div className="text-red-500 font-medium mb-4">{error}</div>
        <div className="flex flex-col space-y-2">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleRetry(false)}
          >
            Try Again
          </button>
          
          {/* Show fallback option only for location permission errors */}
          {error.includes("Location access denied") && (
            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => handleRetry(true)}
            >
              Use Approximate Location
            </button>
          )}
        </div>
      </div>
    );
  }

  // Main weather display
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      {/* Location section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Location</h2>
        {location?.latitude && location?.longitude ? (
          <div>
            <p className="text-gray-600">
              Latitude: {location.latitude.toFixed(4)} | Longitude: {location.longitude.toFixed(4)}
            </p>
            {isApproximateLocation && (
              <p className="text-amber-600 text-sm mt-1">
                Using approximate location based on IP address. For more accurate results, 
                please enable location services.
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Location data unavailable</p>
        )}
      </div>

      {/* Weather section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Weather Information</h2>
        {weather?.weatherData?.main ? (
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">{formatTemp(weather.weatherData.main.temp)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Feels Like:</span>
              <span className="font-medium">{formatTemp(weather.weatherData.main.feels_like)}</span>
            </div>
            
            {weather.weatherData.weather && weather.weatherData.weather[0] && (
              <div className="flex justify-between">
                <span className="text-gray-600">Conditions:</span>
                <span className="font-medium capitalize">
                  {weather.weatherData.weather[0].description || 'N/A'}
                </span>
              </div>
            )}
            
            {weather.weatherData.wind && (
              <div className="flex justify-between">
                <span className="text-gray-600">Wind:</span>
                <span className="font-medium">
                  {weather.weatherData.wind.speed || 'N/A'} m/s, {weather.weatherData.wind.deg || 'N/A'}°
                </span>
              </div>
            )}
            
            {weather.weatherData.main.humidity !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity:</span>
                <span className="font-medium">{weather.weatherData.main.humidity}%</span>
              </div>
            )}
            
            {weather.timestamp && (
              <div className="text-xs text-gray-400 mt-2">
                Last updated: {new Date(weather.timestamp).toLocaleTimeString()}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Weather data unavailable</p>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2">
        <button 
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleRetry(false)}
        >
          Refresh Data
        </button>
        
        {!isApproximateLocation && (
          <button 
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => handleRetry(true)}
          >
            Use IP Location
          </button>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;