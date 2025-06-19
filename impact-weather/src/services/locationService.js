/**
 * Gets the user's current coordinates from the geolocation API
 * @returns {Promise<{latitude: number, longitude: number}>} User coordinates
 */
export function getLocationFromGPS() {
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
                
                resolve({ latitude, longitude, isApproximate: false });
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
            latitude: data?.latitude,
            longitude: data?.longitude,
            isApproximate: true 
        };
    } catch (error) {
        console.error('IP location fallback failed:', error);
        throw error;
    }
}



/**
 * Gets an array of five or fewer suggestions for address or places fields based on the provided part of the address
 * @param {string} address - partial/full address
 * @param {string} apiKey - Your Geoapify API key
 * @returns {Promise<Object>} Array of location suggestion objects (Geoapify Feature objects)
 */
export async function getLocationSuggestionsFromAddress(address, apiKey, abortSignal = null){
    // Input validation
    if (!address?.trim()){
        throw new Error("Address parameter is required");
    }

    try {
        const encodedAddress = encodeURIComponent(address.trim()); // Addresses special characters
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedAddress}&limit=5&apiKey=${apiKey}`, {signal: abortSignal});
        
        if (!response.ok){
            const errorText = await response.text();
            const locationError = new Error(
                "Failed to fetch location suggestions from address"
            );
            locationError.status = response.status;
            locationError.statusText = response.statusText;
            locationError.responseText = errorText;
            throw locationError;
        } 
        
        const data = await response.json();

        // Validate response structure
        if (!data || !Array.isArray(data.features)) {
            throw new Error("Invalid response format from location suggestions from address");
        }

        return data.features;
    } catch (error) {
        throw error;
    }
}