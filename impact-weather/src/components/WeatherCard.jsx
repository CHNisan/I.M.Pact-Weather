import '../styles/WeatherCardStyle.css';

function WeatherCard({value, title, extra, dropdown}) {
    return(
        <div className="container">
            <div className="main">
                <p className="value">{value}</p>
            <p className="title">{title}</p>
            <p className="extra">{extra}</p>
            </div>
            <div className="dropdown">
                <p className="dropdown-text">{dropdown}</p>
            </div>
        </div>
    );
}

export default WeatherCard;