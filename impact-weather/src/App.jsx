import { useState, useEffect, useRef } from "react";
import useLocation from './hooks/useLocation';
import useWeather from './hooks/useWeather';
import {matchPlace} from './services/matchingService'
import IntroDisplay from "./components/IntroDisplay.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import InfoCard from "./components/InfoCard.jsx";
import placeData from "./data/placeData.js";
import "./styles/AppStyle.css";

function App() {
  //#region State
    const [matchedPlace, setMatchedPlace] = useState()
    const [currCharacter, setCurrCharacter] = useState()
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

  useEffect(() => { 
    setCurrCharacter(matchedPlace?.character)

    // Setting CSS variables in the root element
    const root = document.documentElement;
    root.style.setProperty('--background-color', matchedPlace?.character?.image?.color);
  }, [matchedPlace])
  //#endregion


  const infoSection = useRef(null);

  const loading = isLocationLoading || isWeatherLoading;
  const error = locationError || weatherError;


  // #region Rendering
  if (loading || !weather){
    return <></>;
  }

  if (error){
    return (
      <>
        <div className="text-red-500 font-medium mb-4">{error}</div>
        <div className="flex flex-col space-y-2">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
          
          {error.includes("Location access denied") && (
            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
      <section className="intro-display">
        <IntroDisplay
          weather = {weather}
          matchedPlace = {matchedPlace}
          currCharacter = {currCharacter}
          infoSection = {infoSection}
        />
      </section>
 
      <section className="info" ref={infoSection}>
        <section className="weather-cards">
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
        </section>
        <InfoCard 
          info={placeData[0].info}
          quips={placeData[0].quips}
          images={placeData[0].images}
        />
      </section>
    </>
  );
  //#endregion
};

export default App;
