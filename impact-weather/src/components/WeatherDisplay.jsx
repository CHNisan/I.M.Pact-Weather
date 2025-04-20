import React from 'react';
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';

function WeatherDisplay() {
  const {
    location,
    isApproximateLocation,
    locationLoading,
    locationError,
    fetchLocation
  } = useLocation();
  
  const {
    weather,
    weatherLoading,
    weatherError,
    fetchWeather
  } = useWeather(location?.latitude, location?.longitude);

  const loading = locationLoading || weatherLoading;
  const error = locationError || weatherError;

  // Retry functionality with option to try IP-based location
  const handleRetry = (useIPFallback = false) => {
    fetchLocation(useIPFallback);
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
          onClick={() => {
            fetchLocation(false);
          }}
        >
          Refresh Data
        </button>
        
        {!isApproximateLocation && (
          <button 
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => fetchLocation(true)}
          >
            Use IP Location
          </button>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;