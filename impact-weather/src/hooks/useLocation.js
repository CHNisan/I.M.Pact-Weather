import { useState, useEffect } from 'react';
import { getLocationFromGPS, getApproximateLocationFromIP } from '../services/locationService.js';

/**
 * Custom hook for handling user location with fallback to IP-based location
 * @returns {Object} Location data and related functions
 */
export function useLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApproximateLocation, setIsApproximateLocation] = useState(false);

  const fetchLocation = async (useIPFallback = false) => {
    setLoading(true);
    setError(null);

    try {
      const coordinates = useIPFallback
        ? await getApproximateLocationFromIP()
        : await getLocationFromGPS();

      setLocation({ latitude: coordinates.latitude, longitude: coordinates.longitude });
      setIsApproximateLocation(coordinates.isApproximate); // fallback includes flag
      console.log("Got location:", coordinates);
    } catch (err) {
      console.error("Location error:", err);

      if (err.code === 'PERMISSION_DENIED') {
        try {
          // Try fallback to approximate
          const fallback = await getApproximateLocationFromIP();
          setLocation({ latitude: fallback.latitude, longitude: fallback.longitude, source: "ip" });
          setIsApproximateLocation(true);
        } catch (fallbackErr) {
          setError("Location access denied and fallback failed. Please enable location services or try again later.");
        }
      } else {
        setError(err.message || "Unable to retrieve location.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    location,
    isApproximateLocation,
    locationLoading: loading,
    locationError: error,
    fetchLocation,
  };
}

export default useLocation;