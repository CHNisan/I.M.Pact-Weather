import placeData from "../data/placeData";

export function matchPlace(weatherData){
    for (let i=0; i<placeData.length; i++){

        if (placeData[i].minTemp <= weatherData.weatherData.main.temp && weatherData.weatherData.main.temp <= placeData[i].maxTemp){
            const character = placeData[i].characters.find((char) => char.conditionCodes.includes(weatherData.weatherData.weather[0].id))
    
            if (character){
                return {
                    name: placeData[i].name,
                    character: character,
                    info: placeData[i].info
                }
            }
        }
    }
}