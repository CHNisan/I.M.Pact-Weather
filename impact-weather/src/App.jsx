import IntroDisplay from "./components/IntroDisplay.jsx"
import InfoCard from "./components/InfoCard.jsx"
import placeData from "./data/placeData.js"

function App() {
  return (
    <>
      {/* <IntroDisplay/> */}
      <InfoCard 
        info={placeData[0].info}
        quips={placeData[0].quips}
        images={placeData[0].images}
      />
    </>
  )
}

export default App
