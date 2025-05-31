/**
 * Gets weather data for the specified coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} apiKey - OpenWeatherMap API key
 * @returns {Promise<Object>} Weather data
 */
export async function getWeatherByCoordinates(lat, lon, apiKey, isMetric=true) {
    // Parameter validation
    if (lat === null || lon === null || isNaN(lat) || isNaN(lon)) {
        throw new Error("Invalid coordinates: Latitude and longitude must be valid numbers");
    }
    
    if (!apiKey) {
        throw new Error("Missing API key for weather service");
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${isMetric ? "metric" : "imperial"}`;
  
    try {
        // Add timeout to fetch using AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch(endpoint, { 
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        // Check for HTTP errors
        if (!response.ok) {
            const errorText = await response.text();
            const weatherError = new Error(
                `Weather API error (${response.status}): ${response.statusText}`
            );
            weatherError.status = response.status;
            weatherError.statusText = response.statusText;
            weatherError.responseText = errorText;
            throw weatherError;
        }
    
        const weatherData = await response.json();
        
        // Validate response structure
        if (!weatherData || !weatherData.main) {
            throw new Error("Invalid weather data format received from API");
        }

        return {
            weatherData,
            timestamp: new Date().getTime() // Add timestamp for caching purposes
        };
    } 
    catch (error) {
        // Handle abort error specifically
        if (error.name === 'AbortError') {
            const timeoutError = new Error('Weather API request timed out');
            timeoutError.code = 'TIMEOUT';
            throw timeoutError;
        }
        
        // Log and propagate the error 
        console.error("Weather API error:", error);
        throw error;
    }
}