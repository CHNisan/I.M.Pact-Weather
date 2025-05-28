import IntroDisplay from "./components/IntroDisplay.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import InfoCard from "./components/InfoCard.jsx";
import placeData from "./data/placeData.js";
import "./styles/AppStyle.css";

function App() {
  return (
    <>
      <section className="intro-display">
        <IntroDisplay/>
      </section>

      <section className="info">
        <section className="weather-cards">
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
          <WeatherCard 
            value={"20°"}
            title={"Temperature"}
            extra={"Feels Like: 19°"}
            dropdown={"Range: 18°-21°"}
          />
        </section>
        <InfoCard 
          info={placeData[0].info}
          quips={placeData[0].quips}
          images={placeData[0].images}
        />
      </section>
    </>
  );
};

export default App;
