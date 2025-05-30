import { cloneElement } from 'react';
import '../styles/WeatherCardStyle.css';

function WeatherCard({value, icon, title, extra, dropdown}) {
    return(
        <div className="weather-card-container">
            <div className="weather-card-main"> 
                {/* If an icon is passed, display only that without putting it inside a paragraph element (as it casues sizing issues) */}
                {icon ? 
                    cloneElement(icon, { className: "weather-card-icon" }) : 
                    <p className="weather-card-value">{value}</p>
                }
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