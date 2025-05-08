import React from 'react';
import {useState, useEffect} from "react";
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';
import {matchPlace} from '../services/matchingService'
import '../styles/IntroDisplayStyle.css';

function IntroDisplay() {
  //#region State
    const [matchedPlace, setMatchedPlace] = useState()
  //endregion


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

  useEffect(() => {
    setMatchedPlace(matchPlace(weather))
  }, [weather])

  useEffect(() => { // Setting CSS variables in the root element
    const root = document.documentElement;
    root.style.setProperty('--background-image', `url("${matchedPlace?.character?.image?.src}")`);
    root.style.setProperty('--background-color', matchedPlace?.character?.image?.color);
  }, [matchedPlace])
  //#endregion


  //#region Help functions
  const formatTemp = (temp) => (
    temp === undefined || temp === null ? 'N/A' : `${Math.round(temp)}°C`
  );
  //#endregion


  const loading = isLocationLoading || isWeatherLoading;
  const error = locationError || weatherError;

  console.log(matchedPlace)


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
        <p className="intro-text">{matchedPlace.character.dialogue.greeting}</p>
        <p className="intro-text">{`${formatTemp(weather?.weatherData?.main?.temp)} ${matchedPlace.character.dialogue.weather}`}</p>
        <div className="intro-title-container">
          <p className="intro-subtitle top-subtitle">{matchedPlace.character.dialogue.titleBegining}</p>
          <h2 className='intro-title'>{matchedPlace.name}</h2>
          <p className="intro-subtitle bottom-subtitle">{matchedPlace.character.dialogue.titleEnd}</p>
        </div>
        <p className="intro-text">"{matchedPlace.character.quotes}"</p>
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