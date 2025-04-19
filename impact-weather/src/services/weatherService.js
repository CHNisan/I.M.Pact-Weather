export async function getWeatherByCoordinates(lat, lon, apiKey) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
    
        const weatherData = await response.json();

        return {
            weatherData
        }
    } 
    
    catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}