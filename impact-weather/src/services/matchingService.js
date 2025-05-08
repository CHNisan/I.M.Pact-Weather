import placeData from "../data/placeData";

/**
 * Finds a matching place in the hellaverse place database based on temperature and weather condition
 * @param {Object} weatherData - Weather data
 * @returns {Object|null} Place data or null if no match is found
 */
export function matchPlace(weatherData) {
    try{
        const currentTemp = weatherData?.weatherData?.main?.temp;
        const conditionCode = weatherData?.weatherData?.weather[0]?.id;

        // Find a place with matching temperature range
        for (const place of placeData) {
            if (place.minTemp <= currentTemp && currentTemp <= place.maxTemp) {
                const character = place.characters.find(char => 
                    char.conditionCodes.includes(conditionCode)
                );
                
                // If a character exists with a matching condition code, return it, if not continue onto the next place within the temperature range
                if (character) {
                    return {
                        name: place.name,
                        character: character,
                        info: place.info
                    };
                }
            }
        }
    
        // No match found
        return null;
    }

    catch(error){
        console.error("Issue reading weather or place data:", error)
        return null;
    }
}