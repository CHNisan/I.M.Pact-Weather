import { useState, useEffect, useRef } from "react";
import useLocation from './hooks/useLocation';
import useWeather from './hooks/useWeather';
import {matchPlace} from './services/matchingService'
import IntroDisplay from "./components/IntroDisplay.jsx";
import WeatherSection from "./components/WeatherSection.jsx";
import InfoCard from "./components/InfoCard.jsx";
import imperialLocales from "./data/localMeasurementSystemData.js";
import "./styles/AppStyle.css";

function App() {
  //#region State
    const [matchedPlace, setMatchedPlace] = useState();
    const [currCharacter, setCurrCharacter] = useState();
    const [isMetric, setIsMetric] = useState(() => { // Set to imperial system for measurments if the users language local is in a region that uses it
      const userLanguage = navigator.language || navigator.userLanguage;
      if (imperialLocales.includes(userLanguage)){
        return false;
      }
      else{
        return true;
      }
    });
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
  } = useWeather(location?.latitude, location?.longitude, isMetric);

  useEffect(() => {
    setMatchedPlace(matchPlace(weather, isMetric))
  }, [weather])

  useEffect(() => { 
    setCurrCharacter(matchedPlace?.character)

    // Setting CSS variables in the root element
    const root = document.documentElement;
    root.style.setProperty('--background-color', matchedPlace?.character?.image?.color);
  }, [matchedPlace])
  //#endregion


  // Ref to infoSection for condition rendering with loading and error states
  const infoSection = useRef(null);

  const loading = isLocationLoading || isWeatherLoading;
  const error = locationError || weatherError;


  console.log(weather);


  // #region Rendering
  if (error){
    return (
      <div className="error">
        <p className="error-message">{error}</p>
        <button className="error-retry" onClick={fetchLocation}>Try Again</button>
      </div>
    );
  }

  if (loading || !weather){
    return <></>;
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
        <WeatherSection 
          weather = {weather}
          isMetric={isMetric}
        />

        <InfoCard 
          info={matchedPlace.info}
          quips={matchedPlace.quips}
          images={matchedPlace.images}
        />
      </section>
    </>
  );
  //#endregion
};

export default App;
