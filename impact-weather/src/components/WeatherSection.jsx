import { WiThunderstorm, WiRainMix, WiRain, WiSnow, WiSmoke, WiDaySunny, WiCloud } from "react-icons/wi";
import WeatherCard from "./WeatherCard";
import "../styles/WeatherSectionStyle.css";

function WeatherSection({weather, isMetric=true}) {
    //#region Ratings
    const visibilityRatings = [
        // In meters visible
        { min: 0, max: 500, label: "Very Low" },
        { min: 501, max: 2000, label: "Low" },
        { min: 2001, max: 5000, label: "Moderate" },
        { min: 5001, max: 9999, label: "High" },
        { min: 10000, max: 999999, label: "Very High" }
    ];

    const humidityRatings = [
        // In percentage air saturation
        { min: 0, max: 20, label: "Very Low" },
        { min: 21, max: 40, label: "Low" },
        { min: 41, max: 60, label: "Moderate" },
        { min: 61, max: 70, label: "High" },
        { min: 71, max: 90, label: "Very High" },
        { min: 91, max: 100, label: "Extreme" }
    ];
    //#endregion


    //#region Help functions
    function getConditionIcon(condition){
        switch(condition){
            case "Thunderstorm":
                return <WiThunderstorm />
            case "Drizzle":
                return <WiRainMix />
            case "Rain":
                return <WiRain />
            case "Snow":
                return <WiSnow />
            case "Atmosphere":
                return <WiSmoke />
            case "Clear":
                return <WiDaySunny />
            case "Clouds":
                return <WiCloud />
            default:
                return
        }
    }

    function getVisibilityRating(visibility){
        const rating = visibilityRatings.find(r => visibility >= r.min && visibility <= r.max);
        return rating ? rating.label : "Invalid";
    }

    function getHumidityRating(humidity){
        const rating = humidityRatings.find(r => humidity >= r.min && humidity <= r.max);
        return rating ? rating.label : "Invalid";
    }

    function angleToCompassDirection(angle) {
        // Normalize the angle to the range [0, 360)
        angle = (angle % 360 + 360) % 360;

        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(angle / 45) % 8;

        return directions[index];
    }
    //#endregion


    return (
        <article className="weather-section">
            {/* Temperature */}
            <WeatherCard 
                value={`${Math.round(weather?.weatherData?.main?.temp)}°`}
                title={"Temperature"}
                extra={`Feels Like: ${Math.round(weather?.weatherData?.main?.feels_like)}°`}
                dropdown={`Range: ${Math.round(weather?.weatherData?.main?.temp_min)}°-${Math.round(weather?.weatherData?.main?.temp_max)}°`}
            />
            {/* Condition */}
            <WeatherCard 
                icon={getConditionIcon(weather?.weatherData?.weather[0]?.main)} // Icon passed down rather than value (so will not be in a <p> element)
                title={"Condition"}
                extra={weather?.weatherData?.weather[0]?.main} // Condition name
                dropdown={`Visibility: ${getVisibilityRating(weather?.weatherData?.visibility)}`}
            />
            {/* Humidity */}
            <WeatherCard 
                value={`${weather?.weatherData?.main?.humidity}%`}
                title={"Humidity"}
                extra={`Rating: ${getHumidityRating(weather?.weatherData?.main?.humidity)}`}
                dropdown={`Pressure: ${weather?.weatherData?.main?.pressure}`}
            />
            {/* Wind */}
            <WeatherCard 
                value={`${Math.round(weather?.weatherData?.wind?.speed)}`}
                title={`Wind (${isMetric ? "m/s" : "mph"})`} // Switch units depending on if the metric system is being used
                extra={`Direction: ${angleToCompassDirection(weather?.weatherData?.wind?.deg)}`}
                dropdown={"idk look outside"}
            />
        </article>
    );
};

export default WeatherSection;
