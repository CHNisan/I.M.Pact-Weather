import { useState, useEffect } from 'react';
import {getUserCoordinates} from './services/locationService.js'

function App() {
  const [location, setLocation] = useState({latitude: 0, longitude: 0})

  useEffect(() => {
    async function updateLocation(){
      try {
        const coordinates = await getUserCoordinates();
        console.log("Got coordinates:", coordinates);
        setLocation(coordinates);
        
      } catch (error) {
          console.error("Error:", error.message);
      }
    }

    updateLocation();
  }, [])


  return (
    <>
      <p>Latitude:{location.latitude} Longitude: {location.longitude}</p>
    </>
  )
}

export default App
