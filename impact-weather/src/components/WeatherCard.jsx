import '../styles/WeatherCardStyle.css';

function WeatherCard({value, title, extra, dropdown}) {
    return(
        <div className="weather-card-container">
            <div className="weather-card-main">
                <p className="weather-card-value">{value}</p>
            <p className="weather-card-title">{title}</p>
            <p className="weather-card-extra">{extra}</p>
            </div>
            <div className="weather-card-dropdown">
                <p className="weather-card-dropdown-text">{dropdown}</p>
            </div>
        </div>
    );
}

export default WeatherCard;