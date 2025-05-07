import React from 'react';
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';
import {matchPlace} from '../services/matchingService'
import '../styles/IntroDisplayStyle.css';

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

  // Render loading, error, or weather content
  const renderContent = () => {
    // Loading
    if (loading && !weather) {
      return (
        <div className="intro-container">
          <h2>Loading...</h2>
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

    return(
      <div>
        <p className="intro-text">Salutations Sinner!</p>
        <p className="intro-text">20° and roaring</p>
        <div className="intro-title-container">
          <p className="intro-subtitle top-subtitle">it's the</p>
          <h2 className='intro-title'>Pride Ring</h2>
          <p className="intro-subtitle bottom-subtitle">out there</p>
        </div>
        <p className="intro-text">"This face was made for radio"</p>
        <p className="nav-text">show more</p>
      </div>
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