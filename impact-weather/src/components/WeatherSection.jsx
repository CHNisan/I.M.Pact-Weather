import { WiThunderstorm, WiRainMix, WiRain, WiSnow, WiSmoke, WiDaySunny, WiCloud } from "react-icons/wi";
import WeatherCard from "./WeatherCard";
import "../styles/WeatherSectionStyle.css";

function WeatherSection({weather}) {
    const humidityRatings = [
        { min: 0, max: 20, label: "Very Low" },
        { min: 21, max: 40, label: "Low" },
        { min: 41, max: 60, label: "Moderate" },
        { min: 61, max: 70, label: "High" },
        { min: 71, max: 90, label: "Very High" },
        { min: 91, max: 100, label: "Extreme" }
    ];


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


    return (
        <article className="weather-section">
            <WeatherCard 
                value={`${Math.round(weather?.weatherData?.main?.temp)}°`}
                title={"Temperature"}
                extra={`Feels Like: ${Math.round(weather?.weatherData?.main?.feels_like)}°`}
                dropdown={`Range: ${Math.round(weather?.weatherData?.main?.temp_min)}°-${Math.round(weather?.weatherData?.main?.temp_max)}°`}
            />
            <WeatherCard 
                icon={getConditionIcon(weather?.weatherData?.weather[0]?.main)} // Icon passed down rather than value (so will not be in a <p> element)
                title={"Condition"}
                extra={weather?.weatherData?.weather[0]?.main}
                dropdown={"Visibility: 19°"}
            />
            <WeatherCard 
                value={`${weather?.weatherData?.main?.humidity}%`}
                title={"Humidity"}
                extra={`Rating: ${getHumidityRating(weather?.weatherData?.main?.humidity)}`}
                dropdown={`Pressure: ${weather?.weatherData?.main?.pressure}`}
            />
            <WeatherCard 
                value={`${Math.round(weather?.weatherData?.wind?.speed)}`}
                title={"Wind (m/s)"}
                extra={`Direction: ${angleToCompassDirection(weather?.weatherData?.wind?.deg)}`}
                dropdown={"idk look outside"}
            />
        </article>
    );
};

export default WeatherSection;
