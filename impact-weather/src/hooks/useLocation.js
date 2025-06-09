import { useState, useEffect } from 'react';
import { getLocationFromGPS, getApproximateLocationFromIP } from '../services/locationService.js';

/**
 * Custom hook for handling user location with fallback to IP-based location
 * @returns {Object} Location data and related functions
 */
export function useLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApproximateLocation, setIsApproximateLocation] = useState(false);

  const fetchLocation = async (useIPFallbackFirst = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = useIPFallbackFirst
        ? await getApproximateLocationFromIP()
        : await getLocationFromGPS();

      setLocation({ latitude: coordinates.latitude, longitude: coordinates.longitude });
      setIsApproximateLocation(coordinates.isApproximate); // flag to indicate if the IP coordinates are used instead of GPS
      console.log("Got location:", coordinates);
    } catch (err) {
      console.error("Location error:", err);

      if (!useIPFallbackFirst) {
        try {
          const fallbackCoordinates = await getApproximateLocationFromIP();
          setLocation({ latitude: fallbackCoordinates.latitude, longitude: fallbackCoordinates.longitude});
          setIsApproximateLocation(true);
        } catch (fallbackErr) {
          setError("Location access denied/error and fallback failed. Please enable location services or try again later. Error: " + err.message);
        }
      } else{
        setError(err.message || "Unable to retrieve location.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    location,
    isApproximateLocation,
    isLocationLoading: isLoading,
    locationError: error,
    fetchLocation,
  };
}

export default useLocation;