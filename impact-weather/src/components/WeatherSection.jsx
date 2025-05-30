import WeatherCard from "./WeatherCard";
import "../styles/WeatherSectionStyle.css";

function WeatherSection({weather}) {
  return (
    <article className="weather-section">
        <WeatherCard 
        value={`${Math.round(weather?.weatherData?.main?.temp)}°`}
        title={"Temperature"}
        extra={`Feels Like: ${Math.round(weather?.weatherData?.main?.feels_like)}°`}
        dropdown={`Range: ${Math.round(weather?.weatherData?.main?.temp_min)}°-${Math.round(weather?.weatherData?.main?.temp_max)}°`}
        />
        <WeatherCard 
        value={"20°"}
        title={"Condition"}
        extra={"Visibility: 19°"}
        dropdown={"Range: 18°-21°"}
        />
        <WeatherCard 
        value={`${weather?.weatherData?.main?.humidity}%`}
        title={"Humidity"}
        extra={"Rating: 19°"}
        dropdown={`Pressure: ${weather?.weatherData?.main?.pressure}`}
        />
        <WeatherCard 
        value={`${Math.round(weather?.weatherData?.wind?.speed)}`}
        title={"Wind (km/h)"}
        extra={`Direction: ${weather?.weatherData?.wind?.deg}°`}
        dropdown={`Direction: ${weather?.weatherData?.wind?.deg}°`}
        />
    </article>
  );
};

export default WeatherSection;
