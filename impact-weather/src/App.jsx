import { useState, useEffect, useRef } from "react";
import useLocation from './hooks/useLocation';
import useWeather from './hooks/useWeather';
import {matchPlace} from './services/matchingService'
import IntroDisplay from "./components/IntroDisplay.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import WeatherSection from "./components/WeatherSection.jsx";
import InfoCard from "./components/InfoCard.jsx";
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


  // Ref to infoSection for condition rendering with loading and error states
  const infoSection = useRef(null);

  const loading = isLocationLoading || isWeatherLoading;
  const error = locationError || weatherError;


  console.log(weather);


  // #region Rendering
  if (loading || !weather){
    return <></>;
  }

  if (error){
    return (
      <>
        <p className="error-message">{error}</p>
        <button className="error-retry-button" onClick={fetchLocation}>Try Again</button>
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
        <WeatherSection weather = {weather}/>

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
