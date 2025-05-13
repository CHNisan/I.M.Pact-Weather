import IntroDisplay from "./components/IntroDisplay.jsx"
import WeatherCard from "./components/WeatherCard.jsx"

function App() {
  return (
    <>
      {/* <IntroDisplay/> */}
        <WeatherCard 
          value={"20°"}
          title={"Temperature"}
          extra={"Feels Like: 19°"}
          dropdown={"Range: 18°-21°"}
        />
    </>
  )
}

export default App
