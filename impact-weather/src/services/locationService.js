/**
 * Gets the user's current coordinates from the geolocation API
 * @returns {Promise<{latitude: number, longitude: number}>} User coordinates
 */
export function getUserCoordinates() {
    return new Promise((resolve, reject) => {
        // Check browser compatibility
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser"));
            return;
        }

        // Set a separate timeout in case the geolocation API hangs
        const timeoutId = setTimeout(() => {
            reject(new Error("Geolocation request timed out"));
        }, 10000);

        navigator.geolocation.getCurrentPosition(
            // Success Callback
            (position) => {
                clearTimeout(timeoutId);
                
                // Validate the coordinates (sometimes APIs return invalid values)
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                if (isNaN(latitude) || isNaN(longitude) || 
                    latitude < -90 || latitude > 90 || 
                    longitude < -180 || longitude > 180) {
                    reject(new Error("Invalid coordinates received from geolocation API"));
                    return;
                }
                
                resolve({ latitude, longitude });
            },
            
            // Error Callback
            (error) => {
                clearTimeout(timeoutId);
                
                let errorMessage;
                let errorCode;
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please enable location services in your browser settings.";
                        errorCode = "PERMISSION_DENIED";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable. Please try again later.";
                        errorCode = "POSITION_UNAVAILABLE";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get your location timed out. Please check your connection.";
                        errorCode = "TIMEOUT";
                        break;
                    default:
                        errorMessage = "An unknown error occurred while retrieving your location.";
                        errorCode = "UNKNOWN_ERROR";
                }
                
                // Create a structured error object
                const locationError = new Error(errorMessage);
                locationError.code = errorCode;
                locationError.originalError = error;
                
                reject(locationError);
            },
            
            // Options Object
            {
                enableHighAccuracy: true,
                timeout: 7000,
                maximumAge: 0
            }
        );
    });
}



/**
 * Gets the user's current coordinates from the IP API
 * @returns {Promise<{latitude: number, longitude: number, isApproximate: bool}>} User coordinates and flag to show if it's an approximation
 */
export async function getApproximateLocationFromIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch location from IP');
        
        const data = await response.json();
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            isApproximate: true 
        };
    } catch (error) {
        console.error('IP location fallback failed:', error);
        throw error;
    }
}