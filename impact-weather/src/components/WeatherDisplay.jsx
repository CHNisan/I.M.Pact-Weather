import { useState, useEffect } from 'react';
import {getUserCoordinates} from '../services/locationService.js';
import {getWeatherByCoordinates} from '../services/weatherService.js';

function WeatherDisplay() {
  const [location, setLocation] = useState({latitude: 0, longitude: 0})
  const [weather, setWeather] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        // First get coordinates
        const coordinates = await getUserCoordinates();
        setLocation(coordinates);
        console.log("Got coordinates:", coordinates);
        
        // Then get weather using the coordinates we just received
        const weather = await getWeatherByCoordinates(
          coordinates.latitude, 
          coordinates.longitude,
          "05ba03f30ada36832e90e46f1d750efd"
        );
        setWeather(weather);
        console.log("Got weather:", weather);
        
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    
    fetchData();
  }, []);


  return (
    <>
      <p>Latitude:{location?.latitude} Longitude: {location?.longitude}</p>
      <p>Temperature:{weather?.weatherData?.main?.temp} Feels Like:{weather?.weatherData?.main?.feels_like} Weather:{weather?.weatherData?.weather?.description} Wind:{weather?.weatherData?.wind?.speed},{weather?.weatherData?.wind?.deg}</p>
    </>
  )
}

export default WeatherDisplay;
