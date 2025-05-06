import React from 'react';
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';
import {matchPlace} from '../services/matchingService'

function IntroDisplay() {
  //#region Hooks
  const {
    location,
    isApproximateLocation,
    isLocationLoading,
    locationError,
    fetchLocation
  } = useLocation();
  
  const {
    weather,
    isWeatherLoading,
    weatherError,
    fetchWeather
  } = useWeather(location?.latitude, location?.longitude);
  //#endregion

  const loading = isLocationLoading || isWeatherLoading;
  const error = locationError || weatherError;

  //#region Help functions
  const formatTemp = (temp) => (
    temp === undefined || temp === null ? 'N/A' : `${Math.round(temp)}°C`
  );
  //#endregion

  console.log(matchPlace({weatherData: {main: {temp: 15}, weather: [{id: 300}]}}))

  //#region Render functions
  const renderWeatherItem = (label, value) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  // Render loading, error, or weather content
  const renderContent = () => {
    // Loading
    if (loading && !weather) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-xl font-medium text-gray-700">Loading weather information...</div>
        </div>
      );
    }

    // Error
    if (error) {
      return (
        <>
          <div className="text-red-500 font-medium mb-4">{error}</div>
          <div className="flex flex-col space-y-2">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => fetchLocation(false)}
            >
              Try Again
            </button>
            
            {error.includes("Location access denied") && (
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => fetchLocation(true)}
              >
                Use Approximate Location
              </button>
            )}
          </div>
        </>
      );
    }

    return (
      <>
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
              {renderWeatherItem('Temperature', formatTemp(weather.weatherData.main.temp))}
              {renderWeatherItem('Feels Like', formatTemp(weather.weatherData.main.feels_like))}
              
              {weather.weatherData.weather?.[0] && 
                renderWeatherItem('Conditions', weather.weatherData.weather[0].description || 'N/A')}
              
              {weather.weatherData.wind && 
                renderWeatherItem('Wind', `${weather.weatherData.wind.speed || 'N/A'} m/s, ${weather.weatherData.wind.deg || 'N/A'}°`)}
              
              {weather.weatherData.main.humidity !== undefined && 
                renderWeatherItem('Humidity', `${weather.weatherData.main.humidity}%`)}
              
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
            onClick={() => fetchLocation(false)}
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
      </>
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      {renderContent()}
    </div>
  );
  //#endregion
}

export default IntroDisplay;