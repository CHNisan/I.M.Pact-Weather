import '../styles/WeatherCardStyle.css';

function WeatherCard() {
    return(
        <div className="container">
            <div className="main">
                <p className="value">20°</p>
            <p className="title">Temperature</p>
            <p className="extra">Feels Like: 19°</p>
            </div>
            <div className="dropdown">
                <p className="dropdown-text">Range: 18°-21°</p>
            </div>
        </div>
    );
}

export default WeatherCard;